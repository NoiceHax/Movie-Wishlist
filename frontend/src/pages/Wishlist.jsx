import React, { useEffect, useState } from "react";
import * as movieApi from "../api/movieApi.js";
import MovieCard from "../components/MovieCard";

export default function Wishlist() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await movieApi.getWishlist(); // calls /api/wishlist
      setMovies(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Your Wishlist</h1>
      {loading && <p>Loading...</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {movies.map((m) => (
          <MovieCard
            key={m._id}
            movie={m}
            onDelete={() => {
              movieApi.deleteMovie(m._id);
              load();
            }}
            onToggle={() => {
              movieApi.toggleWatched(m._id);
              load();
            }}
          />
        ))}
      </div>
    </div>
  );
}
