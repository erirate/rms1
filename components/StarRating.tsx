interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
}

export default function StarRating({ rating, size = "md", showNumber = true }: StarRatingProps) {
  const sizes = { sm: 14, md: 18, lg: 24 };
  const px = sizes[size];

  return (
    <span className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = rating >= n;
        const half = !filled && rating >= n - 0.5;
        return (
          <svg
            key={n}
            width={px}
            height={px}
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            {half ? (
              <>
                <defs>
                  <linearGradient id={`half-${n}`} x1="0" x2="1" y1="0" y2="0">
                    <stop offset="50%" stopColor="#FACC15" />
                    <stop offset="50%" stopColor="#D1D5DB" />
                  </linearGradient>
                </defs>
                <path
                  d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.44.91-5.32L2.27 6.62l5.34-.78L10 1z"
                  fill={`url(#half-${n})`}
                />
              </>
            ) : (
              <path
                d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.44.91-5.32L2.27 6.62l5.34-.78L10 1z"
                fill={filled ? "#FACC15" : "#D1D5DB"}
              />
            )}
          </svg>
        );
      })}
      {showNumber && (
        <span className="text-sm font-semibold text-gray-700 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </span>
  );
}
