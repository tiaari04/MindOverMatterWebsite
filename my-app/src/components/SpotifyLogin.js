import React from "react";

const CLIENT_ID = "1437669f47ec4e719c6df0ccfb54000b";
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const SCOPES = [
  "streaming",
  "user-read-playback-state",
  "user-modify-playback-state",
  "playlist-read-private",
];

const Login = () => {
  const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPES.join("%20")}`;
  return (
    <div>
      <a href={loginUrl}>Login with Spotify</a>
    </div>
  );
};

export default Login;
