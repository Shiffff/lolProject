const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Define your Riot API route
app.get("/api/free-champions", async (req, res) => {
  const apiKey = "RGAPI-b745cb9e-4f7e-4236-8771-49d88afda3c4"; // Replace with your Riot API key

  try {
    const response = await axios.get(
      `https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations`,
      {
        headers: {
          "X-Riot-Token": apiKey,
        },
      }
    );
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch free champions." });
  }
});

module.exports = app;
