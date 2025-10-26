import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL || '/api';

const API = axios.create({
  baseURL: 'https://movie-wishlist-39p5.onrender.com/api',  headers: { "Content-Type": "application/json" },
});


export const getWishlist = () => API.get("/movies").then((res) => res.data);
export const addMovie = (movie) => API.post("/movies", movie).then((res) => res.data);
export const deleteMovie = (id) => API.delete(`/movies/${id}`);
export const toggleWatched = (id) => API.patch(`/movies/${id}`);
