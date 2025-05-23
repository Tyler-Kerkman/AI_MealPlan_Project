import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import {
  Button,
  TextField,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";

export default function GenerateMealPlan({ setHealthGoal, healthGoal }) {
  const [value, setValue] = useState(new Date());
  const [mealPlan, setMealPlan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const datePickerRef = useRef();

  const handleGenerateMealPlan = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

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
      setSuccess(true);
    } catch (error) {
      console.error("Error generating meal plan:", error);
      setError("Failed to generate meal plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mealPlan) {
      if (value instanceof Date) {
        if (value.getUTCDate() === new Date().getUTCDate()) {
          localStorage.setItem(
            `${value.getMonth() + 1}/${value.getDate()}`,
            JSON.stringify(mealPlan[0])
          );
        }
      } else if (!Array.isArray(value)) {
        localStorage.setItem(
          `${value[0].month.number}/${value[0].day}`,
          JSON.stringify(mealPlan[0])
        );
      } else if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          localStorage.setItem(
            `${value[i].month.number}/${value[i].day}`,
            JSON.stringify(mealPlan[i])
          );
        }
      }
    }
  }, [mealPlan]);

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
      <div style={{ marginTop: "24px", marginBottom: "24px", width: "40%" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Health Goal</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={healthGoal}
            label="Health Goal"
            onChange={(e) => setHealthGoal(e.target.value)}
          >
            <MenuItem value={"weight loss"}>Weight Loss</MenuItem>
            <MenuItem value={"muscle gain"}>Muscle Gain</MenuItem>
            <MenuItem value={"maintain weight"}>Maintain Weight</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Button
        variant="contained"
        onClick={handleGenerateMealPlan}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Meal Plan"}
      </Button>

      {loading && (
        <div style={{ marginTop: "20px" }}>
          <CircularProgress />
        </div>
      )}

      {success && !loading && (
        <h2 style={{ textAlign: "center" }}>Meal Plan Generated</h2>
      )}

      {error && !loading && (
        <Alert severity="error" style={{ marginTop: "20px", width: "300px" }}>
          {error}
        </Alert>
      )}
    </div>
  );
}
