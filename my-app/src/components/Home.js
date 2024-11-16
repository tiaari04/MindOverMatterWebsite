import React from "react";
import PomodoroTimer from "./PomodoroTimer";
import Button from "./Button";
import ToDoList from "./ToDoList";
import Wave from "./Wave";
import "../styles/style.css";  // Adjust the path accordingly


const Home = () => {
  const handleButtonClick = () => {
    console.log("Home Component Rendered");
    console.log("Muse S Connected!");
  };

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
    </div>
  );
};

export default Home;
