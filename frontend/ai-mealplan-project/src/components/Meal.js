import React from "react";
import { BsCake } from "react-icons/bs";
import "./MealCard.css";

function Meal({ meal, setShowMealCard, setShowRecipe, setMeal }) {
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
            setMeal(meal);
            setShowRecipe(true);
          }}
        >
          {meal.name}
        </p>
      </div>
    </div>
  );
}

export default Meal;
