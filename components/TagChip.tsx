"use client";

interface TagChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function TagChip({ label, selected, onClick }: TagChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-trust-green ${
        selected
          ? "bg-trust-green-light border-trust-green text-trust-green"
          : "bg-white border-gray-300 text-gray-600 hover:border-trust-green hover:text-trust-green"
      }`}
    >
      {selected && (
        <span className="mr-1" aria-hidden="true">✓</span>
      )}
      {label}
    </button>
  );
}
