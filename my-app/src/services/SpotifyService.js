import axios from "axios";

const CLIENT_ID = "1437669f47ec4e719c6df0ccfb54000b";
const CLIENT_SECRET = "711605b5b5c94baba61b362ed29c87f0";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

export const refreshAccessToken = async (refreshToken) => {
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });

  try {
    const response = await axios.post(TOKEN_ENDPOINT, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const { access_token } = response.data;
    localStorage.setItem("spotify_access_token", access_token);
    return access_token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};
