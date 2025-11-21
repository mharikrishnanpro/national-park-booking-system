import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-linear-to-r from-green-600 to-blue-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-gray-100 transition">
            🦁 National Park
          </Link>
          <div className="flex gap-6">
            <Link
              to="/"
              className="hover:text-gray-100 transition font-medium"
            >
              Home
            </Link>
            <Link
              to="/booking"
              className="hover:text-gray-100 transition font-medium"
            >
              Booking
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
