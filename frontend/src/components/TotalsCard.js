import React from "react";
import $ from "jquery";
import "./MealCard.css";

export default function TotalsCard({ totals, days }) {
  const ingredientList = Object.entries(totals).map(([name, data]) => ({
    name,
    amount: data.amount,
    unit: data.unit,
  }));

  console.log(days);

  $(document).ready(function () {
    $(".tiptext")
      .on("mouseover", function () {
        $(this).children(".description").show();
      })
      .on("mouseout", function () {
        $(this).children(".description").hide();
      });
  });

  return (
    <div className="meal-card">
      <h1 className="meal-card__title">Total Ingredients</h1>

      <div className="meal-card__section">
        <h2>
          Ingredients Needed For{" "}
          {Array.isArray(days)
            ? days.length === 1
              ? days[0] // If only one day, just show that day
              : `${days[0]} - ${days[days.length - 1]}` // Otherwise, show range
            : days}
        </h2>

        <ul>
          {ingredientList.map((ing, idx) => (
            <li key={idx}>
              <div className="tiptext">
                <a
                  href={`https://www.walmart.com/search?q=${encodeURIComponent(
                    ing.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ing.amount} {ing.unit} {ing.name}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
