# pip install -r requirements.txt
# uvicorn model:app --reload

import json
from typing import Dict, List

import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client(api_key="AIzaSyBzRdsuxmweKGmWcQjTQu9DpSeJVZCLMS0")

columns_to_use = [
    "product_name",
    "brands",
    "categories",
    "ingredients_text",
    "nutriscore_score",
    "nutriscore_grade",
    "energy-kcal_100g",
    "proteins_100g"
]

df = pd.read_csv(
    "en.openfoodfacts.org.products.csv",
    sep="\t",
    encoding="utf-8",
    usecols=columns_to_use,
    on_bad_lines='skip',
    low_memory=False
)

class Ingredient(BaseModel):
    name: str
    amount: float
    unit: str

class Meal(BaseModel):
    name: str
    meal_type: str
    ingredients: List[Ingredient]
    steps: List[str]
    size: int
    calories: int
    protein: int

class SingleMealParams(BaseModel):
    goal: str
    mealType: str
    currentMeals: List[str] = []

class MealPlanParams(BaseModel):
    goal: str
    days: int

class Activity(BaseModel):
    name: str
    sets: int
    reps: int

class Workout(BaseModel):
    name: str
    duration: int # minutes
    activities: List[Activity]

class WorkoutPlanParams(BaseModel):
    goal: str
    days: int

meal_prompt = """
You are an AI agent tasked with generating a completely unique meal in JSON format. 
Each time you generate a meal, it must be distinct from previous outputs.

The meal should include:
- A **generic and commonly known meal name** ("name") that is highly likely to be found in the OpenFoodFacts database.
- Ingredients (list of dictionaries with "name", "amount", and "unit").
- Step-by-step preparation instructions ("steps").
- A serving size in grams ("size", as a number).

Strict rules for meal name and JSON formatting:
- The meal name must be extremely simple and general: **only one to three words maximum**.
- **Do not** include toppings, ingredients, flavors, preparation styles, regions, or specific descriptions in the meal name.
- Examples of acceptable meal names: "French Toast", "Ham Sandwich", "Spaghetti Bolognese", "Omelette", "Grilled Chicken", "Pancakes".
- Examples of unacceptable meal names: "French Toast with Strawberries and Maple Syrup", "Pepperoni Pizza with Mushrooms", "Vegan Thai Coconut Curry with Rice".
- Stick to traditional, globally recognized meals.
- Avoid brand names, unique fusions, or highly regional dishes.
- All ingredient amounts must be written as decimal numbers (e.g., `0.5` instead of `1/2`).
- The output must be strictly valid JSON with correct syntax.
- Do not add any commentary or explanation outside of the JSON structure.
- Only use ingredients that are standard and commonly available in grocery stores.
- Avoid repeating any previous meal names by varying cuisines, ingredients, and cooking methods.

Previous meal names:
"""

workout_prompt = """
You are an AI agent tasked with generating a structured workout plan in JSON format for a user-defined goal and duration.

The workout plan should:
- Be tailored to the provided **fitness goal** (e.g., "muscle gain", "weight loss", "endurance", "general fitness").
- Last for a specified number of **consecutive days**.
- Provide a **unique and varied set of workouts** across the days, avoiding repetition.
- Return a list of JSON objects, each representing one day’s workout, following this exact schema:

[
  {
    "name": "<workout name>",
    "duration": <total duration in minutes>,
    "activities": [
      {
        "name": "<exercise name>",
        "sets": <number of sets>,
        "reps": <number of reps per set>
      },
      ...
    ]
  },
  ...
]

Formatting and content rules:
- The workout plan must be valid JSON with **no additional commentary or text** outside the structure.
- Each workout must have a **generic and recognizable** name, 2–4 words maximum (e.g., "Upper Body Strength", "Cardio Endurance", "Full Body Circuit").
- Exercise names should be common, well-known movements (e.g., "Push Ups", "Jumping Jacks", "Squats", "Plank", "Burpees", "Lunges").
- No exercise should include brand names or uncommon techniques.
- All numbers must be integers. No floating point or fractional values.
- Avoid repeating workouts or exercises across days where possible—keep the plan varied.
- Do not return rest days; every day must have a full workout.

Inputs:
- `goal`: the user's fitness goal (string).
- `days`: the number of consecutive days in the workout plan (integer).

Example goals include: "build muscle", "lose weight", "increase stamina", "improve flexibility", "general fitness".
"""

def generate_meal(prev_meal_names, meal_type, goal):
    result = None

    while result is None:
        full_meal_prompt = meal_prompt + ", ".join(prev_meal_names)
        full_meal_prompt += f"\nThe meal should be suitable for {meal_type}."
        full_meal_prompt += f"\nThe meal should be tailored toward a {goal} goal."

        response = client.models.generate_content(model="gemini-2.0-flash", contents=full_meal_prompt)

        try:
            content_text = response.candidates[0].content.parts[0].text

            if content_text.startswith("```json"):
                import re
                content_text = re.sub(r"^```json\n|\n```$", "", content_text.strip())

            meal_json = json.loads(content_text)
        except Exception as e:
            print(f"Failed parsing meal: {e}")
            continue

        meal_name = meal_json.get("name", "").strip().lower()

        print("Searching local DataFrame for:", meal_name)

        matches = df[df["product_name"].str.lower() == meal_name]

        if matches.empty:
            print(f"No match found in local dataset for '{meal_name}'. Retrying...")
            continue

        best_product = matches.sort_values(by="nutriscore_score", ascending=False).iloc[0]

        calories_per_100 = best_product.get("energy-kcal_100g", 0) or 0
        protein_per_100 = best_product.get("proteins_100g", 0) or 0

        size = meal_json.get("size", 100)

        actual_calories = int(calories_per_100 * (size / 100)) if calories_per_100 else 0
        actual_protein = int(protein_per_100 * (size / 100)) if protein_per_100 else 0

        ingredients = [
            Ingredient(
                name=ingredient["name"],
                amount=ingredient["amount"],
                unit=ingredient["unit"]
            )
            for ingredient in meal_json.get("ingredients", [])
        ]

        result = Meal(
            name=meal_json.get("name"),
            meal_type=meal_type,
            ingredients=ingredients,
            steps=meal_json.get("steps", []),
            size=size,
            calories=actual_calories,
            protein=actual_protein
        )

    return result

@app.post("/generateSingleMeal", response_model=Meal)
def generate_single_meal(request: SingleMealParams):
    meal = generate_meal(request.currentMeals, request.mealType, request.goal)
    return meal

@app.post("/generateMealPlan", response_model=Dict[int, List[Meal]])
def generate_meal_plan(request: MealPlanParams):
    prev_meal_names = []
    meal_types = ["breakfast", "lunch", "dinner"]
    meal_plan = {}

    for day in range(request.days):
      meal_plan[day] = []
      for meal_type in meal_types:
          meal = generate_meal(prev_meal_names, meal_type, request.goal)
          if meal:
              prev_meal_names.append(meal.name)
              meal_plan[day].append(meal)

    return meal_plan

@app.post("/generateWorkoutPlan", response_model=List[Workout])
def generate_workout_plan(request: WorkoutPlanParams):
    full_workout_prompt = workout_prompt
    full_workout_prompt += f"""
                            Goal: {request.goal}
                            Days: {request.days}
                            """
    
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=full_workout_prompt
        )
        content_text = response.candidates[0].content.parts[0].text

        if content_text.startswith("```json"):
            import re
            content_text = re.sub(r"^```json\n|\n```$", "", content_text.strip())

        workout_plan_json = json.loads(content_text)
        return workout_plan_json

    except Exception as e:
        print(f"Failed parsing workout plan: {e}")
        raise HTTPException(status_code=500, detail="Failed to generate or parse workout plan.")