"use client";

import { useState } from "react";
import Link from "next/link";
import StarInput from "@/components/StarInput";
import TagChip from "@/components/TagChip";
import { REVIEW_TAGS, SITTERS } from "@/lib/mockData";

interface RatingsState {
  reliability: number;
  communication: number;
  professionalism: number;
  childEngagement: number;
  safety: number;
}

const CATEGORY_LABELS: { key: keyof RatingsState; label: string }[] = [
  { key: "reliability", label: "Reliability" },
  { key: "communication", label: "Communication" },
  { key: "professionalism", label: "Professionalism" },
  { key: "childEngagement", label: "Child Engagement" },
  { key: "safety", label: "Safety" },
];

export default function NewReviewPage() {
  const [sitterId, setSitterId] = useState(SITTERS[0].id);
  const [ratings, setRatings] = useState<RatingsState>({
    reliability: 0,
    communication: 0,
    professionalism: 0,
    childEngagement: 0,
    safety: 0,
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [anonymous, setAnonymous] = useState(false);
  const [reviewerName, setReviewerName] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedSitter = SITTERS.find((s) => s.id === sitterId) ?? SITTERS[0];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const setRating = (key: keyof RatingsState, value: number) => {
    setRatings((prev) => ({ ...prev, [key]: value }));
  };

  const allRated = Object.values(ratings).every((v) => v > 0);
  const canSubmit = allRated && comment.trim().length > 0 && (anonymous || reviewerName.trim().length > 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-trust-green-light flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 13l4 4L19 7"
              stroke="#16A34A"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Review Submitted!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for helping keep the RateMySitter community safe and informed.
          Your review for <strong>{selectedSitter.name}</strong> has been received.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/sitter/${selectedSitter.id}`}
            className="bg-navy text-white font-semibold px-6 py-3 rounded-lg hover:bg-navy-dark transition-colors"
          >
            View Sitter Profile
          </Link>
          <Link
            href="/"
            className="border-2 border-navy text-navy font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <nav className="text-sm text-gray-400 mb-3 flex items-center gap-2">
          <Link href="/" className="hover:text-trust-green transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-600">Leave a Review</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900">Leave a Review</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Your review helps other parents in your community.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-8">

        {/* ── Sitter Selector ── */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Who are you reviewing?
          </label>
          <select
            value={sitterId}
            onChange={(e) => setSitterId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-trust-green"
          >
            {SITTERS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} — {s.city}, {s.state}
              </option>
            ))}
          </select>
        </section>

        {/* ── Star Ratings ── */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-5">
            Rate each category <span className="text-red-500">*</span>
          </h2>
          <div className="space-y-5">
            {CATEGORY_LABELS.map(({ key, label }) => (
              <StarInput
                key={key}
                label={label}
                value={ratings[key]}
                onChange={(v) => setRating(key, v)}
              />
            ))}
          </div>
          {!allRated && (
            <p className="text-xs text-gray-400 mt-4">Please rate all 5 categories.</p>
          )}
        </section>

        {/* ── Tags ── */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            What stood out? <span className="text-gray-400 font-normal">(optional)</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {REVIEW_TAGS.map((tag) => (
              <TagChip
                key={tag}
                label={tag}
                selected={selectedTags.includes(tag)}
                onClick={() => toggleTag(tag)}
              />
            ))}
          </div>
        </section>

        {/* ── Comment ── */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <label
            htmlFor="comment"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Share your experience <span className="text-red-500">*</span>
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            maxLength={500}
            placeholder="Tell other parents what you loved (or didn't love) about this sitter..."
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-trust-green placeholder-gray-400"
          />
          <p className="text-xs text-gray-400 text-right mt-1">
            {comment.length} / 500
          </p>
        </section>

        {/* ── Display Name ── */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-700">Your name</h2>
            {/* Toggle switch */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <span className="text-xs text-gray-500">
                {anonymous ? "Posting anonymously" : "Showing my name"}
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={anonymous}
                onClick={() => setAnonymous(!anonymous)}
                className={`relative w-10 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-trust-green ${
                  anonymous ? "bg-navy" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                    anonymous ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
              <span className="text-xs font-medium text-gray-600">Anonymous</span>
            </label>
          </div>

          {!anonymous && (
            <div>
              <label htmlFor="reviewer-name" className="block text-xs text-gray-500 mb-1.5">
                First name and last initial (e.g. Rachel T.)
              </label>
              <input
                id="reviewer-name"
                type="text"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="Rachel T."
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-trust-green placeholder-gray-400"
              />
            </div>
          )}

          {anonymous && (
            <p className="text-xs text-gray-400 bg-gray-50 rounded-lg px-4 py-3">
              Your review will appear as &ldquo;Anonymous&rdquo;. Your identity is never stored.
            </p>
          )}
        </section>

        {/* ── Submit ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={!canSubmit}
            className={`flex-1 py-3.5 rounded-lg font-semibold text-white text-base transition-colors ${
              canSubmit
                ? "bg-navy hover:bg-navy-dark cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Submit Review
          </button>
          <Link
            href="/"
            className="flex-1 py-3.5 rounded-lg font-semibold text-center border-2 border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-colors text-base"
          >
            Cancel
          </Link>
        </div>

        {!canSubmit && (
          <p className="text-xs text-center text-gray-400">
            Please rate all categories, write a comment{!anonymous ? ", and enter your name" : ""} to submit.
          </p>
        )}
      </form>
    </main>
  );
}
