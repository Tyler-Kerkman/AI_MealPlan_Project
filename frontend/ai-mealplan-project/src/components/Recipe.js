import React from "react";
import "./MealCard.css";

export default function Recipe({ meal }) {
  return (
    <div className="meal-card">
      <h1 className="meal-card__title">{meal.name} Recipe</h1>

      <div className="meal-card__section">
        <h2>Meal Type:</h2>
        <p>{meal.meal_type}</p>
      </div>

      <div className="meal-card__section">
        <h2>Nutrition Info:</h2>
        <p>Serving Size: {meal.size}g</p>
        <p>Calories: {meal.calories}</p>
        <p>Protein: {meal.protein}g</p>
      </div>

      <div className="meal-card__section">
        <h2>Ingredients:</h2>
        <ul>
          {meal.ingredients.map((ing, idx) => (
            <li key={idx}>
              {ing.amount} {ing.unit} {ing.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="meal-card__section">
        <h2>Steps:</h2>
        <ol>
          {meal.steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
