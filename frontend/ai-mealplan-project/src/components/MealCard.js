import React from "react";
import Meal from "./Meal";
import "./MealCard.css";
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

  return (
    <div className="meal-card">
      <h1 className="meal-card__title">{formattedDate}'s Meal Plan</h1>
      <p className="meal-card__total-calories">
        Total Calories: {meals.calories}
      </p>

      <div className="meal-card__section">
        <h2>Breakfast</h2>
        <p className="meal-card__section-calories">
          {meals.breakfast.calories} calories
        </p>
        <div className="meal-card__meals">
          {meals.breakfast.meals.map((meal, index) => (
            <Meal
              key={index}
              meal={meal}
              setShowMealCard={setShowMealCard}
              setShowRecipe={setShowRecipe}
              setMeal={setMeal}
            />
          ))}
        </div>
      </div>

      <div className="meal-card__section">
        <h2>Lunch</h2>
        <p className="meal-card__section-calories">
          {meals.lunch.calories} calories
        </p>
        <div className="meal-card__meals">
          {meals.lunch.meals.map((meal, index) => (
            <Meal
              key={index}
              meal={meal}
              setShowMealCard={setShowMealCard}
              setShowRecipe={setShowRecipe}
              setMeal={setMeal}
            />
          ))}
        </div>
      </div>

      <div className="meal-card__section">
        <h2>Dinner</h2>
        <p className="meal-card__section-calories">
          {meals.dinner.calories} calories
        </p>
        <div className="meal-card__meals">
          {meals.dinner.meals.map((meal, index) => (
            <Meal
              key={index}
              meal={meal}
              setShowMealCard={setShowMealCard}
              setShowRecipe={setShowRecipe}
              setMeal={setMeal}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MealCard;
