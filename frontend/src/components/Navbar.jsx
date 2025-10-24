import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: 10, background: "#eee" }}>
      <Link to="/">Home</Link> | <Link to="/wishlist">Wishlist</Link>
    </nav>
  );
}
