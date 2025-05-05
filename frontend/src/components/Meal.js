import React from "react";
import { BsCake } from "react-icons/bs";
import "./MealCard.css";

function Meal({ meal, setShowMealCard, setShowRecipe, setSelectedMeal }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div>
        <p
          className="meal-item"
          onClick={() => {
            setShowMealCard(false);
            setSelectedMeal(meal);
            setShowRecipe(true);
          }}
        >
          {meal.name}
        </p>
        <p className="meal-size">{meal.size} g</p>
      </div>
    </div>
  );
}

export default Meal;
