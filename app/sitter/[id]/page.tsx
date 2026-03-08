import Link from "next/link";
import { getSitterProfile } from "@/lib/mockData";
import StarRating from "@/components/StarRating";
import RatingBar from "@/components/RatingBar";
import ReviewCard from "@/components/ReviewCard";

interface SitterPageProps {
  params: Promise<{ id: string }>;
}

const BADGE_MAP: Record<number, { label: string; className: string; icon: string }> = {
  0: { label: "Unclaimed", className: "bg-gray-100 text-gray-500 border border-gray-300", icon: "○" },
  1: { label: "Identity Verified", className: "bg-blue-100 text-blue-700 border border-blue-300", icon: "✓" },
  2: { label: "Fully Verified", className: "bg-trust-green-light text-trust-green border border-trust-green", icon: "✓✓" },
};

export default async function SitterPage({ params }: SitterPageProps) {
  const { id } = await params;
  const sitter = getSitterProfile(id);
  const badge = BADGE_MAP[sitter.verificationLevel] ?? BADGE_MAP[0];

  const categoryRatings = [
    { label: "Reliability", value: sitter.ratings.reliability },
    { label: "Communication", value: sitter.ratings.communication },
    { label: "Professionalism", value: sitter.ratings.professionalism },
    { label: "Child Engagement", value: sitter.ratings.childEngagement },
    { label: "Safety", value: sitter.ratings.safety },
  ];

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-trust-green transition-colors">
          Find a Sitter
        </Link>
        <span>/</span>
        <span className="text-gray-600">{sitter.name}</span>
      </nav>

      {/* ── Profile Header ── */}
      <section className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-navy flex items-center justify-center shrink-0 shadow-lg">
            <span className="text-white text-3xl font-bold">{sitter.initials}</span>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">{sitter.name}</h1>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badge.className}`}>
                {badge.icon} {badge.label}
              </span>
            </div>

            <p className="text-gray-500 text-sm flex items-center gap-1.5 mb-3">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M10 2a6 6 0 016 6c0 4.5-6 10-6 10S4 12.5 4 8a6 6 0 016-6zm0 8a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {sitter.city}, {sitter.state}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <div>
                <StarRating rating={sitter.rating} size="md" />
                <p className="text-xs text-gray-400 mt-1">
                  {sitter.reviewCount} reviews
                </p>
              </div>
            </div>
          </div>

          {/* Claim / Review actions */}
          <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
            <Link
              href={`/review/new?sitter=${sitter.id}`}
              className="text-center bg-trust-green text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              Leave a Review
            </Link>
            <Link
              href={`/claim/${sitter.id}`}
              className="text-center border-2 border-navy text-navy font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              Claim This Profile
            </Link>
          </div>
        </div>

        {/* Bio */}
        {sitter.bio && (
          <div className="mt-5 pt-5 border-t border-gray-100">
            <p className="text-gray-700 text-sm leading-relaxed">{sitter.bio}</p>
          </div>
        )}
      </section>

      {/* ── Category Ratings ── */}
      <section className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Category Ratings</h2>
        <div className="space-y-4">
          {categoryRatings.map(({ label, value }) => (
            <RatingBar key={label} label={label} value={value} />
          ))}
        </div>
      </section>

      {/* ── Reviews ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">
            Reviews ({sitter.reviewCount})
          </h2>
          <Link
            href={`/review/new?sitter=${sitter.id}`}
            className="text-sm text-trust-green hover:underline font-medium"
          >
            + Add your review
          </Link>
        </div>

        <div className="space-y-4">
          {sitter.reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>
    </main>
  );
}
