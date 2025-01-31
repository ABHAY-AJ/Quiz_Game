const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path")
const scoresRouter = require("./routes/scores");
const axios = require("axios")
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


  app.get("/api/quiz", async (req, res) => {
    try {
      const response = await axios.get("https://api.jsonserve.com/Uw5CrX");
      console.log("res",response)
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz data" });
    }
  });


// Routes
app.use("/api/scores", scoresRouter);



app.use(express.static(path.join(__dirname, './frontend/build')));

// Serve the React app for any unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/build', 'index.html'));
});



// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});