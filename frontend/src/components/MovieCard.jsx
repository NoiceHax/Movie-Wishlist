export default function MovieCard({ movie, onDelete, onToggle }) {
  return (
    <div className="border border-gray-700 rounded-lg p-4 w-52 bg-gray-900 text-gray-100 flex flex-col items-center shadow-md">
      <img 
        src={movie.poster} 
        alt={movie.title} 
        className="w-full h-64 object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-semibold text-center">{movie.title}</h3>
      <p className="text-sm text-gray-400">{movie.year}</p>

      {/* Button container */}
      <div className="mt-3 flex gap-2">
        {/* Toggle watched button */}
        <button
          onClick={onToggle}
          className={`px-3 py-1 rounded text-sm font-medium transition ${
            movie.watched
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
        >
          {movie.watched ? "Watched ✅" : "Not Watched ❌"}
        </button>

        {/* Delete button */}
        <button
          onClick={onDelete}
          className="px-3 py-1 rounded text-sm font-medium transition bg-red-600 hover:bg-red-700 text-white"
        >
          Delete 🗑️
        </button>
      </div>
    </div>
  );
}
