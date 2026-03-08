"use client";

import { useState, useMemo } from "react";
import SitterCard from "@/components/SitterCard";
import { SITTERS } from "@/lib/mockData";

export default function HomePage() {
  const [cityInput, setCityInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSitters = useMemo(() => {
    if (!searchQuery.trim()) return SITTERS;
    const q = searchQuery.toLowerCase();
    return SITTERS.filter(
      (s) =>
        s.city.toLowerCase().includes(q) ||
        s.state.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleSearch = () => {
    setSearchQuery(cityInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <main>
      {/* ── Hero Section ── */}
      <section className="bg-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 text-trust-green font-semibold text-sm uppercase tracking-widest mb-4">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.44.91-5.32L2.27 6.62l5.34-.78L10 1z"
                clipRule="evenodd"
              />
            </svg>
            Community-Powered Trust
          </span>

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            Find a Trusted Babysitter
            <br />
            <span className="text-trust-green">Near You</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto mb-10">
            Real reviews from real parents. Search sitters in your city and
            read verified community ratings before you hire.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter a city (e.g. Arlington, DC)"
              className="flex-1 px-5 py-3.5 rounded-lg text-gray-900 bg-white text-base focus:outline-none focus:ring-2 focus:ring-trust-green placeholder-gray-400"
            />
            <button
              onClick={handleSearch}
              className="px-8 py-3.5 bg-trust-green hover:bg-green-700 text-white font-semibold rounded-lg transition-colors text-base shrink-0"
            >
              Search
            </button>
          </div>

          {/* Quick stats */}
          <div className="flex justify-center gap-10 mt-12 text-sm">
            {[
              { value: "2,400+", label: "Sitter profiles" },
              { value: "18,000+", label: "Parent reviews" },
              { value: "Free", label: "Always free to check" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works strip ── */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-16 text-center text-sm text-gray-600">
            {[
              { icon: "🔍", step: "Search", desc: "Find sitters in your city" },
              { icon: "⭐", step: "Read Reviews", desc: "See category ratings from parents" },
              { icon: "✉️", step: "Leave a Review", desc: "Help other families decide" },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-3 sm:flex-col sm:gap-2">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-semibold text-gray-800">{item.step}</div>
                  <div className="text-gray-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sitter Grid ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {searchQuery ? `Sitters in "${searchQuery}"` : "Top-Rated Sitters"}
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              Sorted by community rating
            </p>
          </div>
          {searchQuery && (
            <button
              onClick={() => { setCityInput(""); setSearchQuery(""); }}
              className="text-sm text-trust-green hover:underline font-medium"
            >
              ← Clear search
            </button>
          )}
        </div>

        {filteredSitters.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-medium text-gray-700">No sitters found in &ldquo;{searchQuery}&rdquo;</p>
            <p className="text-sm mt-2">Try a nearby city or check the spelling.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredSitters.map((sitter) => (
              <SitterCard key={sitter.id} sitter={sitter} />
            ))}
          </div>
        )}
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-trust-green-light border-t border-trust-green/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Know a great babysitter? Leave them a review.
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Your review helps other parents in your community find trusted, quality childcare.
          </p>
          <a
            href="/review/new"
            className="inline-block bg-navy text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-navy-dark transition-colors"
          >
            Write a Review
          </a>
        </div>
      </section>
    </main>
  );
}
