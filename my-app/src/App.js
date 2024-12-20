import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Meditate from "./components/Meditate";
import "./styles/style.css";
//import "./styles/home.css";
//import "./styles/meditate.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meditate" element={<Meditate />} />
      </Routes>
    </Router>
  );
};

export default App;