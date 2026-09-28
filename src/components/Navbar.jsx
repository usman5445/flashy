import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <Link to="/" className="flex items-center gap-0 w-fit">
          <span className="bg-red-600 text-white text-sm font-bold px-1.5 py-0.5 rounded-sm">
            Al
          </span>
          <span className="text-gray-900 text-lg font-semibold">maBetter</span>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
