import React, { useState } from "react";
import { addMovie } from "../api/movieApi.js";

export default function AddMovieForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !year) return;

    setLoading(true);
    try {
      // Call backend API to add movie
      const movie = await addMovie({ title, year });

      // Call parent callback
      const success = onAdd ? onAdd(movie) : true;

      // Clear inputs if successfully added
      if (success) {
        setTitle("");
        setYear("");
      }
    } catch (err) {
      console.error("Failed to add movie:", err);
      alert(err.response?.data?.message || "Failed to add movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Movie title"
        className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        required
      />
      <button
        type="submit"
        className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Movie"}
      </button>
    </form>
  );
}
