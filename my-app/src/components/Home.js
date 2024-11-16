import React, { useState, useEffect} from "react";
import PomodoroTimer from "./PomodoroTimer";
import Button from "./Button";
import ToDoList from "./ToDoList";
import Wave from "./Wave";
import "../styles/home.css"; // Adjust the path accordingly

const Home = () => {
  const [average, setAverage] = useState(null); // State to store the fetched average
  const [notification, setNotification] = useState(false); // State to track notifications

  const handleButtonClick = () => {
    console.log("Home Component Rendered");
    console.log("Muse S Connected!");
  };
  const redirectToHTML_puzzle = () => {
    window.location.href = "/puzzle/puzzle.html"; // Path relative to the public directory
  };
  const redirectToHTML_meditate = () => {
    window.location.href = "/meditate/meditate.html"; // Path relative to the public directory
  };
  const redirectToHTML_paint = () => {
    window.location.href = "/paint/paint.html"; // Path relative to the public directory
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
      {/* Menu Bar */}
      <div className="menu-bar">
        <button onClick={toggleMenu} className="menu-button">
          ☰
        </button>
        {menuOpen && (
          <div className="menu-options">
            <button className="menu-option" onClick={redirectToHTML_paint}>
              Paint
            </button>
            <button className="menu-option" onClick={redirectToHTML_meditate}>
              Meditate
            </button>

            <button className="menu-option" onClick={redirectToHTML_puzzle}>
              Puzzle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
