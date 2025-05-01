import React, { use, useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import "./NutritionSection.css";
import {
  BsFillPlusCircleFill,
  BsArrowRightCircleFill,
  BsArrowLeftCircleFill,
} from "react-icons/bs";
import { Button, TextField } from "@mui/material";
import CanvasJSReact from "@canvasjs/react-charts";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function NutritionSection() {
  const [activeTab, setActiveTab] = useState("macros");
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [date, setDate] = useState(new Date());
  const nutrition_info = {
    calories: 0,
    calories_goal: 2500,
    protein: 0,
    protein_goal: 150,
  };
  const [nutritionInfo, setNutritionInfo] = useState(nutrition_info);
  const [calories, setCalories] = useState();
  const [protein, setProtein] = useState();
  const [progressPercentage, setProgressPercentage] = useState(0);

  // useEffect(() => {
  //   handleDateChange();
  // }, [date]);

  useEffect(() => {
    const dateKey = date.toISOString().split("T")[0] + "-nutrition";
    const savedInfo = localStorage.getItem(dateKey);

    let parsedInfo = {
      calories: 0,
      calories_goal: 0,
      protein: 0,
      protein_goal: 0,
    };

    if (savedInfo) {
      try {
        parsedInfo = JSON.parse(savedInfo);
      } catch (err) {
        console.error("Invalid nutrition info in localStorage:", err);
      }
    }

    setNutritionInfo(parsedInfo);

    const { calories, calories_goal } = parsedInfo;
    const progress = calories_goal ? (calories / calories_goal) * 100 : 0;
    setProgressPercentage(progress);
  }, [date]);

  const handleClose = () => {
    setShowAddMeal(false);
  };

  function formatDate(date) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];

    const suffix = (d) => {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${month} ${day}${suffix(day)}`;
  }

  const handleNutritionInfo = () => {
    const parsedCalories = parseInt(calories, 10) || 0;
    const parsedProtein = parseInt(protein, 10) || 0;

    const newNutritionInfo = {
      ...nutritionInfo,
      calories: nutritionInfo.calories + parsedCalories,
      protein: nutritionInfo.protein + parsedProtein,
    };

    setNutritionInfo(newNutritionInfo);

    const dateKey = date.toISOString().split("T")[0] + "-nutrition";

    localStorage.setItem(dateKey, JSON.stringify(newNutritionInfo));
    setProgressPercentage(
      ((parsedCalories + nutritionInfo.calories) /
        nutritionInfo.calories_goal) *
        100
    );
    setCalories();
    setProtein();
    setShowAddMeal(false);
  };

  const handleDateChange = () => {
    const dateKey = date.toISOString().split("T")[0] + "-nutrition";
    console.log(dateKey);
    const savedInfo = localStorage.getItem(dateKey);

    if (savedInfo) {
      try {
        setNutritionInfo(JSON.parse(savedInfo));
      } catch (error) {
        console.error("Failed to parse saved nutrition info:", error);
        setNutritionInfo({
          calories: 0,
          calories_goal: 0,
          protein: 0,
          protein_goal: 0,
        });
      }
    } else {
      setNutritionInfo({
        calories: 0,
        calories_goal: 2500,
        protein: 0,
        protein_goal: 150,
      });
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BsArrowLeftCircleFill
            onClick={() => {
              setDate((prev) => new Date(prev.getTime() - 86400000));
            }}
            style={{
              fontSize: "1.25rem",
              color: "#3b82f6",
              marginBottom: "1rem",
              marginRight: ".5rem",
              cursor: "pointer",
            }}
          />
          <p className="card-title">{formatDate(date)}'s Nutrition</p>
          <BsArrowRightCircleFill
            onClick={() => {
              setDate((prev) => new Date(prev.getTime() + 86400000));
            }}
            style={{
              fontSize: "1.25rem",
              color: "#3b82f6",
              marginBottom: "1rem",
              marginLeft: ".5rem",
              cursor: "pointer",
            }}
          />
        </div>

        <BsFillPlusCircleFill
          style={{
            fontSize: "1.25rem",
            color: "#3b82f6",
            marginBottom: "1rem",
            cursor: "pointer",
          }}
          onClick={() => setShowAddMeal(true)}
        />
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div className="nutrition-container">
          <div className="main-info-container">
            <p className="main-info-title">Calories</p>
            <p className="main-info-value calorie">{nutritionInfo.calories}</p>
          </div>
          <div className="main-info-container">
            <p className="main-info-title">Remaining</p>
            <p className="main-info-value remaining">
              {nutritionInfo.calories_goal - nutritionInfo.calories}
            </p>
          </div>
          <div className="main-info-container">
            <p className="main-info-title">Goal</p>
            <p className="main-info-value goal">
              {nutritionInfo.calories_goal}
            </p>
          </div>
        </div>
        <div className="nutrition-container">
          <div class="progress-container">
            <div
              class="progress-bar"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        <div className="extra-info-container-container">
          <div class="extra-info-card protein-card">
            <p class="extra-info-label protein-label">Protein</p>
            <p class="extra-info-value protein-value">
              {nutritionInfo.protein}g
            </p>
            <p class="extra-info-goal protein-goal">
              Goal: {nutritionInfo.protein_goal}g
            </p>
          </div>
          {/* <div class="extra-info-card carbs-card">
            <p class="extra-info-label carbs-label">Carbs</p>
            <p class="extra-info-value carbs-value">245g</p>
            <p class="extra-info-goal carbs-goal">Goal: 280g</p>
          </div> */}
          {/* 

          <div class="extra-info-card fat-card">
            <p class="extra-info-label fat-label">Fat</p>
            <p class="extra-info-value fat-value">65g</p>
            <p class="extra-info-goal fat-goal">Goal: 80g</p>
          </div>

          <div class="extra-info-card fiber-card">
            <p class="extra-info-label fiber-label">Fiber</p>
            <p class="extra-info-value fiber-value">22g</p>
            <p class="extra-info-goal fiber-goal">Goal: 30g</p>
          </div> */}
        </div>
      </div>

      {showAddMeal && (
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

            <div className="meal-card">
              <h1 className="meal-card__title">
                {formatDate(date)}'s Nutrition
              </h1>
              <div style={{ marginTop: "24px", marginBottom: "24px" }}>
                <TextField
                  id="outlined-basic"
                  label="Calories"
                  variant="outlined"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                />
              </div>
              <div style={{ marginTop: "24px", marginBottom: "24px" }}>
                <TextField
                  id="outlined-basic"
                  label="Protein"
                  variant="outlined"
                  value={protein}
                  onChange={(e) => setProtein(e.target.value)}
                />
              </div>
              <Button variant="contained" onClick={handleNutritionInfo}>
                Add Nutrition Information
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NutritionSection;
