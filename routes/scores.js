const express = require("express");
const UserScore = require("../models/UserScore");
const router = express.Router();

// Save user score
router.post("/save", async (req, res) => {
  try {
    const { name, score } = req.body;
    const newScore = new UserScore({ name, score });
    await newScore.save();
    res.status(201).json({ message: "Score saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save score" });
  }
});

// Get leaderboard
router.get("/leaderboard", async (req, res) => {
  try {
    const scores = await UserScore.find().sort({ score: -1 }).limit(10);
    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

module.exports = router;