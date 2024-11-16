import React from "react";
import PomodoroTimer from "./PomodoroTimer";
import Button from "./Button";
import ToDoList from "./ToDoList";
import Wave from "./Wave";
import "../styles/style.css"; // Adjust the path accordingly

const CLIENT_ID = "1437669f47ec4e719c6df0ccfb54000b"; 
const REDIRECT_URI = "http://localhost:3000"; // Update to your redirect URI
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const SCOPES = [
  "streaming",
  "user-read-playback-state",
  "user-modify-playback-state",
  "playlist-read-private",
];

const Home = () => {
  const handleButtonClick = () => {
    console.log("Home Component Rendered");
    console.log("Muse S Connected!");
  };

  const spotifyLoginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPES.join("%20")}`;

  return (
    <div id="container">
      <div className="pomodoro-timer">
        <PomodoroTimer />
      </div>
      <Button onClick={handleButtonClick} className="connect-btn">
        Connect Muse S
      </Button>
      <ToDoList />
      {/* <Wave /> */}

      <div className="spotify-login">
        <a href={spotifyLoginUrl}>
          <Button className="spotify-login-btn">Login with Spotify</Button>
        </a>
      </div>
    </div>
  );
};

export default Home;
