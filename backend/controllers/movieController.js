import Movie from "../models/movieModel.js";
import axios from "axios";

const OMDB_API = "http://www.omdbapi.com";

export const addMovie = async (req, res) => {
  try {
    const { title } = req.body;
    console.log('Searching for movie:', title);

    const url = `${OMDB_API}/?apikey=${process.env.OMDB_KEY}&t=${encodeURIComponent(title)}`;
    console.log('OMDB API URL:', url);

    const response = await axios.get(url);
    const data = response.data;
    console.log('OMDB Response:', data);

    if (data.Response === "False") {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Avoid duplicates
    const existing = await Movie.findOne({ title: data.Title });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Movie already in wishlist"
      });
    }

    const movie = await Movie.create({
      title: data.Title,
      year: data.Year,
      poster: data.Poster,
    });

    res.status(201).json({
      success: true,
      data: movie
    });
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({
      success: false,
      message: "Failed to add movie",
      error: error.message
    });
  }
};

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ message: error.message });
  }
};

export const toggleWatched = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    movie.watched = !movie.watched;
    await movie.save();
    res.json(movie);
  } catch (error) {
    console.error('Error toggling watched:', error);
    res.status(500).json({ message: error.message });
  }
};
