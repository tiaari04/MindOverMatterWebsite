import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Meditate from "./components/Meditate";
import Login from "./components/SpotifyLogin";
import Callback from "./components/SpotifyCallback";
import { refreshAccessToken } from "./services/SpotifyService";
import "./styles/style.css";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("spotify_access_token"));

  // Refresh token periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const refreshToken = localStorage.getItem("spotify_refresh_token");
      if (refreshToken) {
        refreshAccessToken(refreshToken).then((newToken) => {
          if (newToken) setToken(newToken);
        });
      }
    }, 3600 * 1000); // Refresh every hour
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meditate" element={<Meditate />} />
        <Route
          path="/spotify-login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/callback" element={<Callback setToken={setToken} />} />
      </Routes>
    </Router>
  );
};

export default App;
