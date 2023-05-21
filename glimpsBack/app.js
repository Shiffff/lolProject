const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/api/free-champions", async (req, res) => {
  try {
    const response = await axios.get(
      `https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations`,
      {
        headers: {
          "X-Riot-Token": process.env.API_KEY,
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
