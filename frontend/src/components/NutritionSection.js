import React, { useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import "./NutritionSection.css";
import CanvasJSReact from "@canvasjs/react-charts";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function NutritionSection() {
  const [activeTab, setActiveTab] = useState("macros");

  const options = {
    animationEnabled: true,
    subtitles: [
      {
        text: "1580",
        verticalAlign: "center",
        horizontalAlign: "center",
        fontSize: 40,
        dockInsidePlotArea: true,
      },
      {
        text: "calories remaining",
        verticalAlign: "center",
        horizontalAlign: "center",
        fontSize: 25,
      },
    ],
    legend: {
      verticalAlign: "bottom", // Below chart
      horizontalAlign: "center", // Centered horizontally
      fontSize: 16,
    },
    data: [
      {
        type: "doughnut",
        showInLegend: true,
        centerBackgroundColor: "#f0f0f0", // Light gray center
        dataPoints: [
          { name: "Fat", y: 5 },
          { name: "Carbs", y: 31 },
          { name: "Sugar", y: 40 },
        ],
      },
    ],
  };
  let calories = 2180;
  let goal = 2500;
  let progressPercentage = (calories / goal) * 100;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p className="card-title">Today's Nutrition</p>
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
            <p className="main-info-value calorie">{calories}</p>
          </div>
          <div className="main-info-container">
            <p className="main-info-title">Remaining</p>
            <p className="main-info-value remaining">320</p>
          </div>
          <div className="main-info-container">
            <p className="main-info-title">Goal</p>
            <p className="main-info-value goal">{goal}</p>
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
            <p class="extra-info-value protein-value">120g</p>
            <p class="extra-info-goal protein-goal">Goal: 150g</p>
          </div>
          {/* <div class="extra-info-card carbs-card">
            <p class="extra-info-label carbs-label">Carbs</p>
            <p class="extra-info-value carbs-value">245g</p>
            <p class="extra-info-goal carbs-goal">Goal: 280g</p>
          </div>

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
    </div>
  );
}

export default NutritionSection;
