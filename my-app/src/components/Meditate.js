import { useState, useEffect } from "react";
import React from "react";
import Wave from "./Wave";
import "../styles/meditate.css";  // Adjust the path accordingly

const Meditate = () => {
  const [isBreathingIn, setIsBreathingIn] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const totalTime = 2 * 60 * 1000; // 2 minutes in milliseconds

  // Use an effect to alternate the breathing state every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBreathingIn(prev => !prev); // Toggle the breathing state
    }, 5000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  // Use an effect for the timer bar animation
  useEffect(() => {
    const intervalTime = 20; // Update every 20 ms for smooth animation
    const interval = setInterval(() => {
      setElapsedTime(prev => {
        if (prev + intervalTime >= totalTime) {
          clearInterval(interval); // Stop the timer when it reaches total time
          return totalTime;
        }
        return prev + intervalTime;
      });
    }, intervalTime);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [totalTime]);

  const progress = (elapsedTime / totalTime) * 100; // Calculate progress percentage

  return (
    <div id="container">
      <div className="meditate-container">
      <div className="timer-container">
        <div
          className="timer-bar"
          style={{ width: `${progress}%`, backgroundColor: "darkgreen" }}
        ></div>
      </div>
        <div className="circle">
          <div className="breathe-text">{isBreathingIn ? "Breathe In" : "Breathe Out"}</div>
        </div>
      </div>
      <Wave />
    </div>
  );
};

export default Meditate;
