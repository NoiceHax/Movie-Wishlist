import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      aria-label="Main navigation"
      className="w-full h-16 bg-gray-950 text-gray-100 flex items-center justify-between px-4"
    >
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              isActive("/") ? "bg-white/20 ring-1 ring-white" : "hover:bg-white/10"
            }`}
          >
            Home
          </Link>

          <Link
            to="/wishlist"
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              isActive("/wishlist")
                ? "bg-white/20 ring-1 ring-white"
                : "hover:bg-white/10"
            }`}
          >
            Wishlist
          </Link>
        </div>
      </div>
    </nav>
  );
}
