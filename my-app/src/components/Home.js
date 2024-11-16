import React, { useState } from "react";
import PomodoroTimer from "./PomodoroTimer";
import Button from "./Button";
import ToDoList from "./ToDoList";
import Wave from "./Wave";
import "../styles/home.css";  // Adjust the path accordingly



const Home = () => {
  const handleButtonClick = () => {
    console.log("Home Component Rendered");
    console.log("Muse S Connected!");
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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

      {/* Menu Bar */}
      <div className="menu-bar">
        <button onClick={toggleMenu} className="menu-button">
          ☰
        </button>
        {menuOpen && (
          <div className="menu-options">
            <a href="/meditate" className="menu-option">Meditate</a>
            <a href="/game" className="menu-option">Game</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;