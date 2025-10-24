import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";
import cron from "node-cron";
import axios from "axios";

dotenv.config();
connectDB();

// Log environment variables (excluding sensitive data)
console.log('Environment:', {
  PORT: process.env.PORT,
  OMDB_KEY: process.env.OMDB_KEY ? 'Set' : 'Not set'
});

const app = express();
// Enable CORS for all routes
app.use(cors());

app.use(express.json());

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: err.message });
});

app.get("/", (_, res) => res.send("Movie Wishlist API Running"));
app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.error('Error starting server:', err);
    return;
  }
  console.log(`Server running on http://localhost:${PORT}`);
});

// cron job to ping itself every 14 minutes
cron.schedule("*/14 * * * *", async () => {
  try {
    await axios.get(process.env.RENDER_URL);
    console.log("Pinged Render to stay awake");
  } catch {
    console.log("Ping failed");
  }
});
