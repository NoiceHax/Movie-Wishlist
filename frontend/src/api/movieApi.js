import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { "Content-Type": "application/json" },
});

export const getWishlist = async () => {
  const res = await API.get("/movies");
  return res.data;
};

export const addMovie = async (movie) => {
  const res = await API.post("/movies", movie);
  return res.data;
};

export const deleteMovie = async (id) => {
  const res = await API.delete(`/movies/${id}`);
  return res.data;
};

export const toggleWatched = async (id) => {
  const res = await API.patch(`/movies/${id}`);
  return res.data;
};
