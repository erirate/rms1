import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* Shield icon */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path
              d="M14 2L4 6.5V13C4 18.55 8.34 23.74 14 25C19.66 23.74 24 18.55 24 13V6.5L14 2Z"
              fill="#1B2A4A"
            />
            <path
              d="M12 16.5l-3-3 1.4-1.4 1.6 1.6 4.6-4.6L18 10.5l-6 6Z"
              fill="#16A34A"
            />
          </svg>
          <span className="text-xl font-bold text-navy tracking-tight">
            RateMySitter
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-navy hover:text-trust-green transition-colors"
          >
            Find a Sitter
          </Link>
          <Link
            href="/review/new"
            className="text-sm font-medium text-white bg-trust-green hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
          >
            Leave a Review
          </Link>
        </div>
      </div>
    </nav>
  );
}
