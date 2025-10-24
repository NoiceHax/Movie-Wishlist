export default function MovieCard({ movie, onDelete, onToggle }) {
  return (
    <div style={{ border: "1px solid gray", padding: 10, width: 200 }}>
      <img src={movie.poster} alt={movie.title} width="100%" />
      <h3>{movie.title}</h3>
      <p>{movie.year}</p>
      <p>Status: {movie.watched ? "Watched ✅" : "Not Watched ❌"}</p>
      <button onClick={onToggle}>Toggle</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}
