import axios from "axios";

// Use Vite environment variable VITE_API_URL when provided (for production)
// otherwise fall back to the relative '/api' path which works with Vite's dev proxy.
const baseURL = import.meta.env.VITE_API_URL || '/api';

const API = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export const getWishlist = () => API.get("/movies").then((res) => res.data);
export const addMovie = (movie) => API.post("/movies", movie).then((res) => res.data);
export const deleteMovie = (id) => API.delete(`/movies/${id}`);
export const toggleWatched = (id) => API.patch(`/movies/${id}`);
