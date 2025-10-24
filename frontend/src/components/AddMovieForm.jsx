import React, { useState } from "react";
import * as movieApi from "../api/movieApi.js";

export default function AddMovieForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

    const submit = async (e) => {
  e.preventDefault();
  if (!title) return;
  try {
    const newMovie = await movieApi.addMovie({ title, year });
    // notify parent so it can update its list immediately
    if (onAdd) onAdd(newMovie);
    setTitle("");
    setYear("");
  } catch (err) {
    console.error(err);
    alert("Failed to add movie");
  }
};


  return (
    <form onSubmit={submit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter movie title"
        required
      />
      <input
        type="text"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Enter movie year"
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}
