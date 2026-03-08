import Link from "next/link";
import { SitterSummary } from "@/lib/mockData";
import StarRating from "./StarRating";

interface SitterCardProps {
  sitter: SitterSummary;
}

const BADGE_STYLES: Record<number, { label: string; className: string }> = {
  0: { label: "Unclaimed", className: "bg-gray-100 text-gray-500" },
  1: { label: "Identity Verified", className: "bg-blue-100 text-soft-blue" },
  2: { label: "Fully Verified", className: "bg-trust-green-light text-trust-green" },
};

export default function SitterCard({ sitter }: SitterCardProps) {
  const badge = BADGE_STYLES[sitter.verificationLevel] ?? BADGE_STYLES[0];

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col">
      {/* Top accent bar */}
      <div className="h-1.5 bg-navy" />

      <div className="p-5 flex flex-col flex-1">
        {/* Avatar + badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center shrink-0">
            <span className="text-white text-xl font-bold">{sitter.initials}</span>
          </div>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badge.className}`}
          >
            {badge.label}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h3 className="text-base font-bold text-gray-900">{sitter.name}</h3>
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
            <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M10 2a6 6 0 016 6c0 4.5-6 10-6 10S4 12.5 4 8a6 6 0 016-6zm0 8a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {sitter.city}
          </p>

          <div className="mt-2">
            <StarRating rating={sitter.rating} size="sm" />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {sitter.reviewCount} {sitter.reviewCount === 1 ? "review" : "reviews"}
          </p>
        </div>

        {/* CTA */}
        <Link
          href={`/sitter/${sitter.id}`}
          className="mt-4 block text-center bg-navy text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-navy-dark transition-colors"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
