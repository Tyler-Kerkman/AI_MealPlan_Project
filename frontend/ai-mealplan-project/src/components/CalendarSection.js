import React, { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import MealCard from "./MealCard";

function CalendarSection() {
  const [value, setValue] = useState(new Date());
  const [showMealCard, setShowMealCard] = useState(false);

  React.useEffect(() => {
    console.log(`${value.getUTCMonth() + 1}/${value.getUTCDate()}`);
  }, [value]);

  const mealplan_data = {
    calories: 2009,
    breakfast: {
      calories: 542,
      meals: ["Peach and Blueberry Parfait", "Buttered Toast"],
    },
    lunch: {
      calories: 542,
      meals: [
        "Raspberries and Blackberries Protein Smoothie",
        "Pinto Bean Salad",
      ],
    },
    dinner: {
      calories: 542,
      meals: ["Kahuku Shrimp", "Easy Spinach and Scallion Salad"],
    },
  };

  const handleDateChange = (date) => {
    setValue(date);
    setShowMealCard(true);
  };

  const handleClose = () => setShowMealCard(false);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
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
            <MealCard meals={mealplan_data} date={value} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarSection;
