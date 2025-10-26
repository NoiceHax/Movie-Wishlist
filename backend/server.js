import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";
import cron from "node-cron";
import axios from "axios";

// Load environment variables
dotenv.config();
connectDB();

console.log('Environment:', {
  PORT: process.env.PORT,
  OMDB_KEY: process.env.OMDB_KEY ? 'Set' : 'Not set'
});

const app = express();

// CORS setup
const allowedFromEnv = (process.env.ALLOWED_ORIGINS || process.env.CLIENT_URL || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

const defaultAllowed = [
  'https://moviewishlist.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
];

const allowedOrigins = Array.from(new Set([...allowedFromEnv, ...defaultAllowed]));
console.log('CORS allowed origins:', allowedOrigins);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS policy: This origin is not allowed'));
  },
  credentials: true,
}));

// Body parser
app.use(express.json());

// Health check & API routes
app.get("/api/health", (_, res) => res.send("Movie Wishlist API Running"));
app.use("/api/movies", movieRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Optional: ping Render to stay awake
if (process.env.RENDER_URL) {
  cron.schedule("*/14 * * * *", async () => {
    try {
      await axios.get(process.env.RENDER_URL);
      console.log("Pinged Render to stay awake");
    } catch {
      console.log("Ping failed");
    }
  });
}
