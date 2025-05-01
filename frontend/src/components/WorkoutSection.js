import axios from "axios";
import React, { useEffect, useState } from "react";
import "./WorkoutSection.css";

function WorkoutSection({ selectedDate }) {
  const goals = ["Weight Loss", "Endurance", "Muscle Building"];
  const [selectedGoal, setSelectedGoal] = useState(goals[0]);
  const [loading, setLoading] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    const storedPlan = localStorage.getItem("weeklyWorkoutPlan");
    if (storedPlan) {
      setWorkoutPlan(JSON.parse(storedPlan));
    }
  }, []);

  useEffect(() => {
    if (workoutPlan) {
      localStorage.setItem("weeklyWorkoutPlan", JSON.stringify(workoutPlan));
    }
  }, [workoutPlan]);

  const generateWeeklyPlan = async () => {
    try {
      setLoading(true);
      const requestBody = { goal: selectedGoal, days: 7 };
      const response = await axios.post(
        "http://127.0.0.1:8000/generateWorkoutPlan",
        requestBody
      );
      setWorkoutPlan(response.data);
    } catch (error) {
      console.error("Error generating workout plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearWorkoutPlan = () => {
    localStorage.removeItem("weeklyWorkoutPlan");
    setWorkoutPlan(null);
    setSelectedDay(0);
  };

  function getDayIndexFromDate(dateString) {
    const date = new Date(dateString);
    const jsDay = date.getUTCDay();
    return (jsDay + 6) % 7;
  }

  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <p className="header-text">Workout</p>

        {workoutPlan ? (
          <>
            <p className="p-2 border rounded header-text-dropdown">
              {dayNames[getDayIndexFromDate(selectedDate)]}
            </p>
            <button
              onClick={clearWorkoutPlan}
              style={{
                marginLeft: "0.5rem",
                background: "#f87171",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "0.25rem",
                cursor: "pointer",
              }}
            >
              Clear
            </button>
          </>
        ) : (
          <select
            value={selectedGoal}
            onChange={(e) => setSelectedGoal(e.target.value)}
            className="p-2 border rounded header-text-dropdown"
          >
            {goals.map((goal) => (
              <option key={goal} value={goal}>
                {goal}
              </option>
            ))}
          </select>
        )}
      </div>

      <hr style={{ width: "100%", border: "1px solid #e5e7eb" }} />

      {loading ? (
        <p>Generating Workout Plan...</p>
      ) : workoutPlan ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p className="header-text">
              {workoutPlan[getDayIndexFromDate(selectedDate)].name} (
              {workoutPlan[getDayIndexFromDate(selectedDate)].duration} min)
            </p>
          </div>
          <ul style={{ listStyleType: "none", padding: 0, margin: "1rem 0" }}>
            {workoutPlan[getDayIndexFromDate(selectedDate)].activities.map(
              (activity, j) => (
                <li key={j} className="exercise-item">
                  {activity.name} - {activity.sets}x{activity.reps}
                </li>
              )
            )}
          </ul>
          <hr style={{ width: "100%", border: "1px solid #e5e7eb" }} />
        </>
      ) : (
        <p>No workout plan loaded.</p>
      )}

      {!workoutPlan && (
        <button
          onClick={generateWeeklyPlan}
          style={{
            width: "100%",
            padding: "0.5rem",
            backgroundColor: "#f3f4f6",
            border: "1px solid #e5e7eb",
            borderRadius: "0.25rem",
            cursor: "pointer",
            marginTop: "1rem",
          }}
        >
          Generate Plan
        </button>
      )}
    </div>
  );
}

export default WorkoutSection;
