import React, { useState } from "react";
import AddMovieForm from "../components/AddMovieForm";

export default function Home() {
  // keep local list so we can append new movies immediately when added
  const [movies, setMovies] = useState([]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Add a Movie</h1>
      <AddMovieForm onAdd={(newMovie) => setMovies((prev) => [...prev, newMovie])} />
    </div>
  );
}
