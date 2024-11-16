import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CLIENT_ID = "1437669f47ec4e719c6df0ccfb54000b";
const CLIENT_SECRET = "711605b5b5c94baba61b362ed29c87f0";
const REDIRECT_URI = "http://localhost:3000/callback";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const Callback = ({ setToken }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = async (code) => {
      const body = new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      });

      try {
        const response = await axios.post(TOKEN_ENDPOINT, body, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        const { access_token, refresh_token } = response.data;
        setToken(access_token);
        localStorage.setItem("spotify_access_token", access_token);
        localStorage.setItem("spotify_refresh_token", refresh_token);

        // Redirect to Home page
        navigate("/");
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (code) getToken(code);
  }, [navigate, setToken]);

  return <div>Redirecting...</div>;
};

export default Callback;
