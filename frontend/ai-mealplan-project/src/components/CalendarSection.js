import React, { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import MealCard from "./MealCard";
import { Button, recomposeColor } from "@mui/material";
import Recipe from "./Recipe";

function CalendarSection() {
  const [value, setValue] = useState(new Date());
  const [showMealCard, setShowMealCard] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);
  const [meal, setMeal] = useState({});

  React.useEffect(() => {
    console.log(`${value.getUTCMonth() + 1}/${value.getUTCDate()}`);
  }, [value]);

  const mealplan_data = {
    calories: 2009,
    breakfast: {
      calories: 542,
      meals: [
        {
          name: "Peach and Blueberry Parfait",
          recipe: "Recipe for Peach and Blueberry Parfait",
        },
        {
          name: "Buttered Toast",
          recipe: "Recipe for Buttered Toast",
        },
      ],
    },
    lunch: {
      calories: 542,
      meals: [
        {
          name: "Raspberries and Blackberries Protein Smoothie",
          recipe: "Recipe for Raspberries and Blackberries Protein Smoothie",
        },
        {
          name: "Pinto Bean Salad",
          recipe: "Recipe for Pinto Bean Salad",
        },
      ],
    },
    dinner: {
      calories: 542,
      meals: [
        {
          name: "Kahuku Shrimp",
          recipe: "Recipe for Kahuku Shrimp",
        },
        {
          name: "Easy Spinach and Scallion Salad",
          recipe: "Recipe for Easy Spinach and Scallion Salad",
        },
      ],
    },
  };

  const handleDateChange = (date) => {
    setValue(date);
    setShowMealCard(true);
  };

  const handleClose = () => {
    setShowMealCard(false);
    setShowRecipe(false);
  };

  return (
    <div>
      <Button variant="contained">Generate Meal Plan</Button>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          marginTop: "1rem",
        }}
      >
        <Calendar
          className="Calendar"
          onChange={handleDateChange}
          value={value}
        />
        {showMealCard && (
          <div
            style={{
              position: "fixed", // or "absolute" if you want it relative to the parent
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.4)", // semi-transparent overlay
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
            onClick={handleClose} // clicking the overlay closes the popup
          >
            <div
              style={{
                background: "#fff",
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
                minWidth: "300px",
                minHeight: "200px",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside the popup
            >
              <button
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  background: "transparent",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
                onClick={handleClose}
              >
                &times;
              </button>
              <MealCard
                meals={mealplan_data}
                date={value}
                setShowMealCard={setShowMealCard}
                setShowRecipe={setShowRecipe}
                setMeal={setMeal}
              />
            </div>
          </div>
        )}

        {showRecipe && (
          <div
            style={{
              position: "fixed", // or "absolute" if you want it relative to the parent
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.4)", // semi-transparent overlay
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
            onClick={handleClose} // clicking the overlay closes the popup
          >
            <div
              style={{
                background: "#fff",
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
                minWidth: "300px",
                minHeight: "200px",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside the popup
            >
              <button
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  background: "transparent",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
                onClick={handleClose}
              >
                &times;
              </button>
              <Recipe meal={meal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CalendarSection;
