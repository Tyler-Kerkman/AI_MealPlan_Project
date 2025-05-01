import React, { useEffect, useState } from "react";
import CalendarSection from "./components/CalendarSection";
import Navbar from "./components/Navbar";
import NutritionSection from "./components/NutritionSection";
import WorkoutSection from "./components/WorkoutSection";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backgroundColor: "white",
        }}
      >
        <Navbar />
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          width: "100%",
          overflowX: "hidden",
        }}
      >
        <div
          style={{
            width: "25%",
            backgroundColor: "#2A3343",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            overflowX: "hidden",
          }}
        >
          <div
            style={{
              padding: "1rem",
              borderBottom: "1px solid #e5e7eb",
              overflowX: "hidden",
              backgroundColor: "#ffffff",
              borderRadius: ".75rem",
            }}
          >
            <NutritionSection />
          </div>
          <div
            style={{
              padding: "1rem",
              borderBottom: "1px solid #e5e7eb",
              overflowX: "hidden",
              backgroundColor: "#ffffff",
              borderRadius: ".75rem",
            }}
          >
            <WorkoutSection selectedDate={selectedDate} />
          </div>
        </div>

        <div
          style={{
            width: "75%",
            backgroundColor: "#ffffff",
            padding: "1rem",
            overflowX: "hidden",
          }}
        >
          <CalendarSection setSelectedDate={setSelectedDate} />
        </div>
      </div>
    </div>
  );
}

export default App;
