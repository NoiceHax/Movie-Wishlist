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
      console.debug("getWishlist response:", data);
      setMovies(data || []);
    } catch (err) {
      console.error("load() failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center px-4 py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* translucent card to match inner divs */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold mb-4">Your Wishlist</h1>
            <div className="flex items-center gap-2">
              
            </div>
          </div>

          {/*{loading && <p className="text-sm text-white/80">Loading...</p>}*/}

          <div className="flex flex-wrap gap-4 mt-4">
            {movies.map((m) => {
              const id = m._id || m.id; // normalize id shape
              return (
                <MovieCard
                  key={id || Math.random()}
                  movie={m}
                  onDelete={async () => {
                    console.debug("delete requested for:", id, m);
                    const prev = movies;
                    // optimistic remove for snappy UI
                    setMovies((cur) => cur.filter((it) => (it._id || it.id) !== id));
                    try {
                      await movieApi.deleteMovie(id);
                      await load(); // ensure backend and UI are in sync
                    } catch (err) {
                      console.error("Failed to delete:", err);
                      setMovies(prev); // revert on error
                    }
                  }}
                  onToggle={async () => {
                    console.debug("toggle requested for:", id, m);
                    const prev = movies;
                    setMovies((cur) =>
                      cur.map((it) =>
                        (it._id || it.id) === id ? { ...it, watched: !it.watched } : it
                      )
                    );
                    try {
                      await movieApi.toggleWatched(id);
                      await load(); // resync with backend
                    } catch (err) {
                      console.error("Failed to toggle watched:", err);
                      setMovies(prev); // revert
                    }
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
