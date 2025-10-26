import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from "./config/db.js";
import movieRoutes from "./routes/movieRoutes.js";
import cron from "node-cron";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });
connectDB();

console.log('Environment:', {
  PORT: process.env.PORT,
  OMDB_KEY: process.env.OMDB_KEY ? 'Set' : 'Not set'
});

// Express setup
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
  'http://localhost:5000',
];

const allowedOrigins = Array.from(new Set([...allowedFromEnv, ...defaultAllowed]));

console.log('CORS allowed origins:', allowedOrigins);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: This origin is not allowed'));
  },
  credentials: true,
}));

// Body parser
app.use(express.json());

// API routes first
app.get("/api/health", (_, res) => res.send("Movie Wishlist API Running"));
app.use("/api/movies", movieRoutes);

// Custom error handler middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Static file serving for React app - must be last
const reactDist = path.join(__dirname, '../frontend/dist');
app.use('/', express.static(reactDist));
app.use((req, res) => {
  res.sendFile(path.join(reactDist, 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Optional: cron job to ping itself
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
