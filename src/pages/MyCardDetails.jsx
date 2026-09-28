import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import {
  FiShare2,
  FiCopy,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiArrowLeft,
  FiX,
} from "react-icons/fi";

function MyCardDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cards = useSelector((state) => state);
  const card = cards.find((c) => c.id === id);

  const [activeIndex, setActiveIndex] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!card) {
    return (
      <div className="min-h-screen bg-[#f0ebe5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Flashcard not found.</p>
          <button
            onClick={() => navigate("/my-cards")}
            className="text-red-600 font-medium hover:underline"
          >
            ← Back to My Cards
          </button>
        </div>
      </div>
    );
  }

  const terms = card.terms || [];
  const activeTerm = terms[activeIndex];
  const shareUrl = window.location.href;

  const handlePrev = () =>
    setActiveIndex((i) => (i - 1 + terms.length) % terms.length);
  const handleNext = () =>
    setActiveIndex((i) => (i + 1) % terms.length);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-[#f0ebe5]">
      {/* Page Header & Tabs */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
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

      {/* Card Title & Description */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate("/my-cards")}
            className="text-gray-600 hover:text-gray-900 transition-colors p-1 rounded-full hover:bg-gray-200"
            aria-label="Go back"
          >
            <FiArrowLeft size={20} />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">{card.groupName}</h2>
        </div>
        {card.groupDescription && (
          <p className="text-gray-500 text-sm leading-relaxed ml-8">
            {card.groupDescription}
          </p>
        )}
      </div>

      {/* Main 3-column layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex gap-5 items-start">

          {/* LEFT — Term List */}
          <div className="w-52 flex-shrink-0 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Flashcards
              </p>
            </div>
            <ul className="py-2">
              {terms.map((t, i) => (
                <li key={i}>
                  <button
                    onClick={() => setActiveIndex(i)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      i === activeIndex
                        ? "text-red-600 font-semibold bg-red-50"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {t.term || `Card ${i + 1}`}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CENTRE — Card Viewer + Carousel */}
          <div className="flex-1 flex flex-col">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden min-h-[260px]">
              {activeTerm ? (
                <div className="flex flex-col sm:flex-row h-full">
                  {/* Image */}
                  {activeTerm.image && (
                    <div className="sm:w-56 flex-shrink-0 bg-gray-50 flex items-center justify-center p-4 border-b sm:border-b-0 sm:border-r border-gray-100">
                      <img
                        src={activeTerm.image}
                        alt={activeTerm.term}
                        className="max-h-48 w-full object-contain rounded-md"
                      />
                    </div>
                  )}
                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col justify-center">
                    <h3 className="text-base font-semibold text-gray-900 mb-3">
                      {activeTerm.term}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {activeTerm.definition}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm p-8">
                  No terms added.
                </div>
              )}
            </div>

            {/* Carousel navigation */}
            {terms.length > 0 && (
              <div className="flex items-center justify-center gap-6 mt-5">
                <button
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:border-red-500 hover:text-red-600 transition-colors shadow-sm"
                  aria-label="Previous term"
                >
                  <FiChevronLeft size={18} />
                </button>
                <span className="text-sm text-gray-500 font-medium tabular-nums">
                  {activeIndex + 1}/{terms.length}
                </span>
                <button
                  onClick={handleNext}
                  className="w-9 h-9 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:border-red-500 hover:text-red-600 transition-colors shadow-sm"
                  aria-label="Next term"
                >
                  <FiChevronRight size={18} />
                </button>
              </div>
            )}
          </div>

          {/* RIGHT — Actions */}
          <div className="w-44 flex-shrink-0 flex flex-col gap-3">
            <button
              id="share-btn"
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-2.5 border border-gray-200 bg-white rounded-lg px-4 py-2.5 text-sm text-gray-700 hover:border-red-400 hover:text-red-600 transition-colors shadow-sm w-full cursor-pointer"
            >
              <FiShare2 size={16} />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setShowShareModal(false)}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 relative">
            {/* Close */}
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <FiX size={20} />
            </button>

            <h3 className="text-lg font-semibold text-gray-900 mb-5">Share</h3>

            {/* Link row */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50">
              <span className="text-xs text-gray-400 font-medium shrink-0">Link:</span>
              <span className="text-xs text-gray-600 truncate flex-1">{shareUrl}</span>
              <button
                id="copy-link-btn"
                onClick={handleCopy}
                className={`ml-auto flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  copied
                    ? "bg-green-100 text-green-600"
                    : "bg-red-50 text-red-600 hover:bg-red-100"
                }`}
              >
                {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyCardDetails;
