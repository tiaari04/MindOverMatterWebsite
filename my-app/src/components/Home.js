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
  const redirectToHTML_puzzle = () => {
    window.location.href = '/puzzle/puzzle.html'; // Path relative to the public directory
  }
  const redirectToHTML_meditate = () => {
    window.location.href = '/meditate/meditate.html'; // Path relative to the public directory
  }
  const redirectToHTML_paint = () => {
    window.location.href = '/paint/paint.html'; // Path relative to the public directory
  }

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
            <button 
          className="menu-option"
          onClick={redirectToHTML_paint}> 
          Paint
        </button>
            <button 
          className="menu-option"
          onClick={redirectToHTML_meditate}> 
          Meditate
        </button>
           
        <button 
          className="menu-option"
          onClick={redirectToHTML_puzzle}> 
          Puzzle
        </button>
        
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;