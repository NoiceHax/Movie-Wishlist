import React, { useState } from "react";

export default function AddMovieForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onAdd({ title, year });
    if (success) {
      // Only clear form if addition was successful
      setTitle("");
      setYear("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Movie title"
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          required
        />
      </div>
      <div>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Year"
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded"
      >
        Add Movie
      </button>
    </form>
  );
}
