import React from "react";
import Wave from "./components/Wave";
import ToDoList from "./components/ToDoList";
import Button from "./components/Button";
import "./styles/style.css";

const App = () => {
  const handleButtonClick = () => {
    console.log("Muse S Connected!");
  };
  return (
    <div id="container">
      <Button onClick={handleButtonClick} className="connect-btn">
        Connect Muse S
      </Button>
      <ToDoList />
      <Wave />
    </div>
  );
};

export default App;
