import Movie from "../models/movieModel.js";
import axios from "axios";

// Using template literals for better readability
const OMDB_API = "http://www.omdbapi.com";

export const addMovie = async (req, res) => {
  try {
    const { title } = req.body;
    console.log('Searching for movie:', title);
    const url = `${OMDB_API}/?apikey=${process.env.OMDB_KEY}&t=${encodeURIComponent(title)}`;
    console.log('OMDB API URL:', url);
    
    const response = await axios.get(url);
    console.log('OMDB Response:', response.data);
    const data = response.data;

    if (data.Response === "False") return res.status(404).json({ message: "Movie not found" });

    const movie = await Movie.create({
      title: data.Title,
      year: data.Year,
      poster: data.Poster,
    });

    res.json(movie);
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ message: error.message, details: error.toString() });
  }
};

export const getMovies = async (_, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

export const deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

export const toggleWatched = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  movie.watched = !movie.watched;
  await movie.save();
  res.json(movie);
};
