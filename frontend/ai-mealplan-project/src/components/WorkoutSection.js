import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./WorkoutSection.css";

function WorkoutSection({ workout_data }) {
  const options = ["Weight Lifting", "Cardio"];
  const [selected, setSelected] = useState(options[0]);

  const getWorkout = () => {
    if (selected === "Weight Lifting") return workout_data.weightlifting;
    if (selected === "Cardio") return workout_data.cardio;
    return workout_data.weightlifting;
  };

  let workout = getWorkout();

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
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="p-2 border rounded header-text-dropdown"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <hr
        style={{
          width: "100%",
          border: "1px solid #e5e7eb",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p className="header-text">{workout.type}</p>
      </div>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
          margin: "1rem 0",
        }}
      >
        {workout.exercises.map((exercise, index) => (
          <li key={index} className="exercise-item ">
            {exercise}
          </li>
        ))}
      </ul>
      <hr
        style={{
          width: "100%",
          border: "1px solid #e5e7eb",
        }}
      />
      <button
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
        See More
      </button>
    </div>
  );
}

export default WorkoutSection;
