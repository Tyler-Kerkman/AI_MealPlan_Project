import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import { Button, TextField } from "@mui/material";
import axios from "axios";

export default function GenerateMealPlan() {
  const [value, setValue] = useState(new Date());
  const [healthGoal, setHealthGoal] = useState("");
  const [mealPlan, setMealPlan] = useState(null);
  const datePickerRef = useRef();

  const handleGenerateMealPlan = async () => {
    try {
      // Calculate the number of days selected
      const days = value.length ? value.length : 1;

      const requestBody = {
        goal: healthGoal,
        days: days,
      };

      console.log("Sending request:", requestBody);

      const response = await axios.post(
        "http://127.0.0.1:8000/generateMealPlan",
        requestBody
      );

      console.log("Received meal plan:", response.data);
      setMealPlan(response.data);
    } catch (error) {
      console.error("Error generating meal plan:", error);
    }
  };

  useEffect(() => {
    // console.log(value);
    if (value.length === undefined || value.length === 1) {
      console.log(`${value.getMonth() + 1}/${value.getDate()}`);
    } else {
      for (let i = 0; i < value.length; i++) {
        console.log(`${value[i].month.number}/${value[i].day}`);
      }
    }
  }, [value]);

  return (
    <div
      className="meal-card"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 className="meal-card__title meal-card__section">
        Generate Meal Plan
      </h1>
      <div>
        <DatePicker
          value={value}
          onChange={setValue}
          multiple={true}
          ref={datePickerRef}
          style={{ height: "1.75rem" }}
        />{" "}
        <Button
          variant="outlined"
          onClick={() => datePickerRef.current.closeCalendar()}
        >
          Close
        </Button>
      </div>
      <div style={{ marginTop: "24px", marginBottom: "24px" }}>
        <TextField
          id="outlined-basic"
          label="Health Goal"
          variant="outlined"
          value={healthGoal}
          onChange={(e) => setHealthGoal(e.target.value)}
        />
      </div>
      <Button variant="contained" onClick={handleGenerateMealPlan}>
        Generate Meal Plan
      </Button>
    </div>
  );
}
