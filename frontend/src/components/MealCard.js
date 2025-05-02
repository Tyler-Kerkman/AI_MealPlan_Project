import React from "react";
import Meal from "./Meal";
import "./MealCard.css";
import { BsArrowRepeat } from "react-icons/bs";
import axios from "axios";

/**
 *
 *  meals is an object with in the format
 *  {
 *    breakfast: {
 *      meals: [],
 *      calories: int,
 *      nutrition: []
 *    },
 *    lunch: {
 *      meals: [],
 *      calories: int,
 *      nutrition: []
 *    },
 *    dinner: {
 *      meals: [],
 *      calories: int,
 *      nutrition: []
 *    },
 *    calories: int
 *  }
 *
 */
function MealCard({ meals, date, setShowMealCard, setShowRecipe, setMeal }) {
  // Format the date to a readable string
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const handleSingleMeal = async (mealType) => {
    try {
      const requestBody = {
        goal: "weight loss",
        mealType: mealType,
        currentMeals: [meals[0].name, meals[1].name, meals[2].name],
      };

      console.log("Sending request:", requestBody);

      const response = await axios.post(
        "http://127.0.0.1:8000/generateSingleMeal",
        requestBody
      );

      console.log("Received meal plan:", response.data);
      updateLocalStorage(response.data);
      setMeal((prevMeals) => {
        return prevMeals.map((meal) =>
          meal.meal_type === "breakfast" ? response.data : meal
        );
      });
    } catch (error) {
      console.error("Error generating meal plan:", error);
    }
  };

  const updateLocalStorage = (newMeal) => {
    const key = `${date.getMonth() + 1}/${date.getDate()}`;
    const existingData = JSON.parse(localStorage.getItem(key)) || [];

    // Replace the breakfast meal
    const updatedData = existingData.map((meal) =>
      meal.meal_type === "breakfast" ? newMeal : meal
    );
    localStorage.setItem(key, JSON.stringify(updatedData));
  };

  return (
    <div className="meal-card">
      <h1 className="meal-card__title">{formattedDate}'s Meal Plan</h1>
      <p className="meal-card__total-calories">
        Total Calories:{" "}
        {meals[0].calories + meals[1].calories + meals[2].calories}
      </p>

      <div className="meal-card__section">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Breakfast</h2>
          <BsArrowRepeat
            style={{ fontSize: "1.25rem", cursor: "pointer" }}
            onClick={() => handleSingleMeal("breakfast")}
          />
        </div>

        <p className="meal-card__section-calories">
          {meals[0].calories} calories
        </p>
        <div className="meal-card__meals">
          <Meal
            meal={meals[0]}
            setShowMealCard={setShowMealCard}
            setShowRecipe={setShowRecipe}
            setMeal={setMeal}
          />
        </div>
      </div>

      <div className="meal-card__section">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Lunch</h2>
          <BsArrowRepeat style={{ fontSize: "1.25rem", cursor: "pointer" }} />
        </div>{" "}
        <p className="meal-card__section-calories">
          {meals[1].calories} calories
        </p>
        <div className="meal-card__meals">
          <Meal
            meal={meals[1]}
            setShowMealCard={setShowMealCard}
            setShowRecipe={setShowRecipe}
            setMeal={setMeal}
          />
        </div>
      </div>

      <div className="meal-card__section">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Dinner</h2>
          <BsArrowRepeat style={{ fontSize: "1.25rem", cursor: "pointer" }} />
        </div>{" "}
        <p className="meal-card__section-calories">
          {meals[2].calories} calories
        </p>
        <div className="meal-card__meals">
          <Meal
            meal={meals[2]}
            setShowMealCard={setShowMealCard}
            setShowRecipe={setShowRecipe}
            setMeal={setMeal}
          />
        </div>
      </div>
    </div>
  );
}

export default MealCard;
