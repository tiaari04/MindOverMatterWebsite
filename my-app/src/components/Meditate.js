import { useState, useEffect } from "react";
import React from "react";
import Wave from "./Wave";
import "../styles/meditate.css";  // Adjust the path accordingly


const Meditate = () => {
    const [isBreathingIn, setIsBreathingIn] = useState(true);

  // Use an effect to alternate breathing state
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBreathingIn(prev => !prev); // Toggle the breathing state
    }, 2500); // 5-second interval for expanding/contracting

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);
  return (
    <div id="container">
        <div className="meditate-container">
        <div className="circle">
            <div className="breathe-text">{isBreathingIn ? "Breathe In" : "Breathe Out"}</div>
        </div>
        </div>
      <Wave />
    </div>
  );
};

export default Meditate;
