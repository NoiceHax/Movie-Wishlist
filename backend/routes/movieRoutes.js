import express from "express";
import { addMovie, getMovies, deleteMovie, toggleWatched } from "../controllers/movieController.js";

const router = express.Router();

router.post("/", addMovie);
router.get("/", getMovies);
router.delete("/:id", deleteMovie);
router.patch("/:id", toggleWatched);

export default router;
