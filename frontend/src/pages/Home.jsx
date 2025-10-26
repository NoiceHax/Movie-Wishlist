import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddMovieForm from "../components/AddMovieForm";
import "../index.css";
import "../App.css";

export default function Home() {
  const [movies, setMovies] = useState([]);

  const isDuplicate = (newMovie) => {
    return movies.some(
      (movie) =>
        movie.title.toLowerCase().trim() === newMovie.title.toLowerCase().trim() &&
        movie.year === newMovie.year
    );
  };

  const handleAddMovie = (newMovie) => {
    // Prevent adding if movie is duplicate
    if (isDuplicate(newMovie)) {
      alert("This movie is already in your wishlist!");
      return false;
    }
    
    // Only add if not duplicate
    setMovies(prev => [...prev, newMovie]);
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center px-4 py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-500 flex items-center justify-center gap-2">
          🎬 Movie Wishlist
        </h1>
        <p className="text-gray-400 mt-2 text-lg">
          Track and manage the movies you want to watch
        </p>
      </header>

      {/* Add Movie Section */}
      <section className="bg-gray-900 rounded-2xl shadow-lg border border-purple-800/20 w-full max-w-3xl p-8">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <span className="text-purple-500 text-3xl">+</span> Add New Movie
        </h2>

        <AddMovieForm onAdd={handleAddMovie} />
      </section>

      {/* Empty State */}
      {movies.length === 0 && (
        <div className="flex flex-col items-center mt-20 text-center text-gray-400">
          <div className="text-6xl mb-4">🎞️</div>
          <h3 className="text-xl font-semibold text-gray-200">
            No movies yet
          </h3>
          <p className="text-gray-500">
            Add your first movie to get started!
          </p>
        </div>
      )}

      {/* Wishlist Link */}
      {movies.length > 0 && (
        <div className="mt-12">
          <Link
            to="/wishlist"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition-colors"
          >
            🎬 Click to see your movies
          </Link>
        </div>
      )}
    </div>
  );
}
