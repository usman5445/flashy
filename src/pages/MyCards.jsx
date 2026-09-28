import React from "react";
import { NavLink } from "react-router-dom";

function MyCards() {
  return (
    <div className="min-h-screen bg-[#f0ebe5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Create Flashcard
        </h1>
        <div className="flex gap-6 border-b border-gray-300">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `pb-2 text-sm font-medium transition-colors ${
                isActive
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-500 hover:text-gray-700"
              }`
            }
          >
            Create New
          </NavLink>
          <NavLink
            to="/my-cards"
            className={({ isActive }) =>
              `pb-2 text-sm font-medium transition-colors ${
                isActive
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-500 hover:text-gray-700"
              }`
            }
          >
            My Flashcard
          </NavLink>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-gray-500">
        <p className="text-lg">My Flashcards page — coming soon.</p>
      </div>
    </div>
  );
}

export default MyCards;
