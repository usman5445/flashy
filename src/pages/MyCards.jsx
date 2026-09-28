import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiArrowRight } from "react-icons/fi";

function MyCards() {
  const cards = useSelector((state) => state);

  return (
    <div className="min-h-screen bg-[#f0ebe5]">
      {/* Page Header & Tabs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Create Flashcard</h1>
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

      {/* Cards Grid */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cards.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">No flashcards yet.</p>
            <Link
              to="/"
              className="text-red-600 font-medium hover:underline text-sm"
            >
              + Create your first flashcard
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-xl shadow-sm p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow"
              >
                {/* Avatar / group image */}
                <div className="w-16 h-16 rounded-full bg-blue-50 overflow-hidden flex items-center justify-center mb-3 border border-gray-100">
                  {card.groupImage ? (
                    <img
                      src={card.groupImage}
                      alt={card.groupName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl text-blue-200 font-bold">
                      {card.groupName?.[0]?.toUpperCase() || "?"}
                    </span>
                  )}
                </div>

                <h2 className="text-base font-semibold text-gray-900 mb-1">
                  {card.groupName}
                </h2>

                {card.groupDescription && (
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2 leading-relaxed">
                    {card.groupDescription}
                  </p>
                )}

                <p className="text-xs text-gray-400 mb-4">
                  {card.terms?.length || 0} Cards
                </p>

                <Link
                  to={`/my-cards/${card.id}`}
                  className="flex items-center gap-1.5 border border-red-500 text-red-600 text-sm font-medium px-5 py-1.5 rounded-md hover:bg-red-50 transition-colors"
                >
                  View Cards
                  <FiArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyCards;
