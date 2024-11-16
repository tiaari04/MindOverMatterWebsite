import React, { useState, useEffect } from "react";
import Wave from "./components/Wave";
import ToDoList from "./components/ToDoList";
import Button from "./components/Button";
import PomodoroTimer from "./components/PomodoroTimer";
import "./styles/style.css";

const App = () => {
  const [average, setAverage] = useState(null); // State to store the fetched average
  const [notification, setNotification] = useState(false); // State to track notifications

  const handleButtonClick = async () => {
    // try {
    //   const response = await fetch("http://localhost:5000/connect-muse", {
    //     method: "POST",
    //   });
    //   const message = await response.text();
    //   console.log(message);
    // } catch (error) {
    //   console.error("Failed to connect Muse:", error);
    // }
    console.log("Button Clicked")
  };

  const fetchAverage = async () => {
    try {
      const response = await fetch("http://localhost:5001/get-average");
      if (response.ok) {
        const data = await response.json();
        const fetchedAverage = data.two_minute_average;
        console.log("2-Minute Average:", fetchedAverage);

        setAverage(fetchedAverage);
      } else {
        console.log("No data available yet.");
      }
    } catch (error) {
      console.error("Error fetching average:", error);
    }
  };

  // Fetching average every 2 mins?!!!!!!!!!!!!!!!!!1
  useEffect(() => {
    const interval = setInterval(fetchAverage, 120000); 
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Use effect to trigger notification based on average value


  useEffect(() => {
    // update threshold!!!!!!!!!!!!!!!!!!!
    if (average !== null && average > 3.43) { 
      setNotification(true); 
      // console.log("return to studying");

      // Set timeout to hide notification after 5 seconds
      const timeout = setTimeout(() => {
        setNotification(false); // Hide notification after 5 seconds
      }, 1000000);

      // Clean up timeout when the component unmounts or when the notification is cleared
      return () => clearTimeout(timeout);
    }
  }, [average]);

  return (
    <div id="container">
      <div className="pomodoro-timer">
        <PomodoroTimer />
      </div>
      <Button onClick={handleButtonClick} className="connect-btn">
        Connect Muse S
      </Button>
      <ToDoList />
      <Wave />
      {notification && (
        <div className="notification">
          <p>You're focused!</p>
        </div>
      )}
    </div>
  );
};

export default App;
