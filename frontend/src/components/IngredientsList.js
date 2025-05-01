import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import { Button, TextField } from "@mui/material";
import TotalsCard from "./TotalsCard";

export default function IngredientsList({ setShowIngredientsList }) {
  const [value, setValue] = useState(new Date());
  const datePickerRef = useRef();
  const [showList, setShowList] = useState(false);
  const [totals, setTotals] = useState({});

  const formatDays = () => {
    if (Array.isArray(value)) {
      return value.map(
        (d) =>
          `${
            d.month?.name || d.toLocaleString("default", { month: "short" })
          } ${d.day || d.getDate()}`
      );
    } else {
      return [
        value.toLocaleDateString(undefined, {
          month: "long",
          day: "numeric",
        }),
      ];
    }
  };

  const getIngredients = () => {
    let items = [];
    let newTotals = {};
    if (value.length === undefined) {
      const stored = localStorage.getItem(
        `${value.getMonth() + 1}/${value.getDate()}`
      );
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed) items.push(parsed);
      }
    } else {
      for (let i = 0; i < value.length; i++) {
        const stored = localStorage.getItem(
          `${value[i].month.number}/${value[i].day}`
        );
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed) items.push(parsed);
        }
      }
    }
    items.forEach((item) => {
      if (!Array.isArray(item)) return;
      item.forEach((meal) => {
        if (!meal?.ingredients) return;
        meal.ingredients.forEach((ingredient) => {
          const { name, amount, unit } = ingredient;

          if (newTotals[name]) {
            newTotals[name].amount += amount;
          } else {
            newTotals[name] = {
              amount: amount,
              unit: unit,
            };
          }
        });
      });
    });
    setTotals(newTotals);
    setShowList(true);
  };

  const handleClose = () => {
    setShowList(false);
    setShowIngredientsList(false);
  };

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
        Generate Ingredients List
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
      <Button
        variant="contained"
        onClick={() => getIngredients()}
        style={{ marginTop: "24px", marginBottom: "24px" }}
      >
        Generate List
      </Button>
      {showList && (
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
            <TotalsCard totals={totals} days={formatDays()} />
          </div>
        </div>
      )}
    </div>
  );
}
