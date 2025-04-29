import React from "react";
import "./MealCard.css";

export default function Recipe({ meal }) {
  return (
    <div className="meal-card">
      <h1 className="meal-card__title">{meal.name}'s Recipe</h1>
      <p>{meal.recipe}</p>
    </div>
  );
}
