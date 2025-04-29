import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import MealCard from "./MealCard";
import { Button, recomposeColor } from "@mui/material";
import Recipe from "./Recipe";
import GenerateMealPlan from "./GenerateMealPlan";

function CalendarSection() {
  const [value, setValue] = useState(new Date());
  const [showMealCard, setShowMealCard] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);
  const [meal, setMeal] = useState({});
  const [currentMeal, setCurrentMeal] = useState();
  const [showGenerateMealPlan, setShowGenerateMealPlan] = useState(false);
  const [datesWithMealPlans, setDatesWithMealPlans] = useState([]);

  React.useEffect(() => {
    console.log(`${value.getUTCMonth() + 1}/${value.getUTCDate()}`);
  }, [value]);
  useEffect(() => {
    const findAllMealPlanDates = () => {
      const dates = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (/^\d+\/\d+$/.test(key)) {
          dates.push(key);
        }
      }
      return dates;
    };

    setDatesWithMealPlans(findAllMealPlanDates());
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const dates = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (/^\d+\/\d+$/.test(key)) {
          dates.push(key);
        }
      }
      setDatesWithMealPlans(dates);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  const mealplan_data = [
    {
      name: "Scrambled Eggs",
      meal_type: "breakfast",
      ingredients: [
        {
          name: "Eggs",
          amount: 2,
          unit: "whole",
        },
        {
          name: "Milk",
          amount: 0.03,
          unit: "liter",
        },
        {
          name: "Butter",
          amount: 0.005,
          unit: "kilogram",
        },
        {
          name: "Salt",
          amount: 0.001,
          unit: "kilogram",
        },
        {
          name: "Black Pepper",
          amount: 0.0005,
          unit: "kilogram",
        },
      ],
      steps: [
        "Crack the eggs into a bowl.",
        "Add milk, salt, and pepper.",
        "Whisk the ingredients together until well combined.",
        "Melt butter in a non-stick pan over medium heat.",
        "Pour the egg mixture into the pan.",
        "Cook, stirring occasionally, until the eggs are set but still slightly moist.",
        "Remove from heat and serve immediately.",
      ],
      size: 150,
      calories: 837,
      protein: 59,
    },
    {
      name: "Tuna Salad",
      meal_type: "lunch",
      ingredients: [
        {
          name: "Canned Tuna",
          amount: 120,
          unit: "g",
        },
        {
          name: "Mayonnaise",
          amount: 20,
          unit: "g",
        },
        {
          name: "Celery",
          amount: 30,
          unit: "g",
        },
        {
          name: "Red Onion",
          amount: 15,
          unit: "g",
        },
        {
          name: "Lemon Juice",
          amount: 5,
          unit: "ml",
        },
        {
          name: "Salt",
          amount: 0.5,
          unit: "g",
        },
        {
          name: "Black Pepper",
          amount: 0.3,
          unit: "g",
        },
        {
          name: "Lettuce",
          amount: 50,
          unit: "g",
        },
      ],
      steps: [
        "Drain the canned tuna.",
        "Finely chop the celery and red onion.",
        "In a bowl, combine the tuna, mayonnaise, celery, red onion, lemon juice, salt, and pepper.",
        "Mix well until all ingredients are combined.",
        "Serve the tuna salad on a bed of lettuce.",
      ],
      size: 240,
      calories: 799,
      protein: 35,
    },
    {
      name: "Chicken Stir-fry",
      meal_type: "dinner",
      ingredients: [
        {
          name: "Chicken Breast",
          amount: 150,
          unit: "grams",
        },
        {
          name: "Broccoli Florets",
          amount: 100,
          unit: "grams",
        },
        {
          name: "Carrots",
          amount: 50,
          unit: "grams",
        },
        {
          name: "Soy Sauce",
          amount: 0.02,
          unit: "liter",
        },
        {
          name: "Sesame Oil",
          amount: 0.005,
          unit: "liter",
        },
        {
          name: "Garlic",
          amount: 2,
          unit: "cloves",
        },
        {
          name: "Ginger",
          amount: 10,
          unit: "grams",
        },
        {
          name: "Brown Rice",
          amount: 100,
          unit: "grams",
        },
      ],
      steps: [
        "Cook brown rice according to package instructions.",
        "Cut chicken breast into bite-sized pieces.",
        "Heat sesame oil in a wok or large skillet over medium-high heat.",
        "Add garlic and ginger to the wok and stir-fry for 30 seconds until fragrant.",
        "Add chicken to the wok and stir-fry until cooked through.",
        "Add broccoli florets and sliced carrots to the wok and stir-fry until tender-crisp.",
        "Pour soy sauce over the chicken and vegetables and stir-fry to combine.",
        "Serve chicken stir-fry over cooked brown rice.",
      ],
      size: 400,
      calories: 960,
      protein: 10,
    },
  ];

  const handleDateChange = (date) => {
    setValue(date);
    setShowMealCard(true);
    handleMealPlan(date);
  };

  const handleMealPlan = (date) => {
    console.log("value", `${date.getUTCMonth() + 1}/${date.getUTCDate()}`);
    if (
      localStorage.getItem(`${date.getUTCMonth() + 1}/${date.getUTCDate()}`)
    ) {
      console.log(
        JSON.parse(
          localStorage.getItem(`${date.getUTCMonth() + 1}/${date.getUTCDate()}`)
        )
      );
      setCurrentMeal(
        JSON.parse(
          localStorage.getItem(`${date.getUTCMonth() + 1}/${date.getUTCDate()}`)
        )
      );
    } else {
      setCurrentMeal();
    }
  };

  const handleClose = () => {
    setShowMealCard(false);
    setShowRecipe(false);
    setShowGenerateMealPlan(false);
  };

  const tileClassName = ({ date, view }) => {
    if (view !== "month") return null;

    const dateKey = `${date.getUTCMonth() + 1}/${date.getUTCDate()}`;
    if (datesWithMealPlans.includes(dateKey)) {
      return "has-meal-plan";
    }
    return null;
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setShowGenerateMealPlan(true)}>
        Generate Meal Plan
      </Button>
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
          value={value}
          onChange={handleDateChange}
          tileClassName={tileClassName}
        />
        {showMealCard && currentMeal && (
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
                meals={currentMeal}
                date={value}
                setShowMealCard={setShowMealCard}
                setShowRecipe={setShowRecipe}
                setMeal={setMeal}
              />
            </div>
          </div>
        )}

        {showGenerateMealPlan && (
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
                minWidth: "600px",
                minHeight: "400px",
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
              <GenerateMealPlan />
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
              overflow: "auto",
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
                maxHeight: "90vh",
                overflowY: "auto",
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
