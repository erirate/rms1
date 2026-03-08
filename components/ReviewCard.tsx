import { Review } from "@/lib/mockData";
import StarRating from "./StarRating";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-bold">
              {review.anonymous ? "A" : review.author.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">
              {review.anonymous ? "Anonymous" : review.author}
            </p>
            <p className="text-xs text-gray-400">{review.date}</p>
          </div>
        </div>
        <StarRating rating={review.rating} size="sm" />
      </div>

      {review.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {review.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 bg-trust-green-light text-trust-green text-xs font-medium rounded-full border border-trust-green"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {review.comment && (
        <p className="mt-3 text-sm text-gray-700 leading-relaxed">
          {review.comment}
        </p>
      )}
    </div>
  );
}
