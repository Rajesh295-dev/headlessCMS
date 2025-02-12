
import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;
const apiToken = process.env.REACT_APP_API_TOKEN;

// Log for debugging (remove in production)
// console.log("API URL:", apiURL);
// console.log("API Token:", apiToken ? "Exists" : "Missing");

if (!apiURL || !apiToken) {
  console.error("⚠️ API URL or Token is missing. Check your .env file.");
}

export const makeRequest = axios.create({
  baseURL: apiURL || "https://fallback-api.com", // Provide a fallback URL to avoid errors
  headers: {
    Authorization: `Bearer ${apiToken || ""}`, // Ensure token doesn't break requests
  },
});
