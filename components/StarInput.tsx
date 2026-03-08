"use client";

import { useState } from "react";

interface StarInputProps {
  label: string;
  value: number;
  onChange: (n: number) => void;
}

export default function StarInput({ label, value, onChange }: StarInputProps) {
  const [hovered, setHovered] = useState(0);

  const display = hovered || value;

  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm font-medium text-gray-700 w-44 shrink-0">{label}</span>
      <div
        className="flex items-center gap-1"
        onMouseLeave={() => setHovered(0)}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            onMouseEnter={() => setHovered(n)}
            className="p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-trust-green rounded"
            aria-label={`Rate ${n} star${n !== 1 ? "s" : ""} for ${label}`}
          >
            <svg width="28" height="28" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.44.91-5.32L2.27 6.62l5.34-.78L10 1z"
                fill={display >= n ? "#FACC15" : "#D1D5DB"}
                className="transition-colors duration-100"
              />
            </svg>
          </button>
        ))}
      </div>
      <span className="text-sm text-gray-500 w-6 text-right">
        {value > 0 ? value : "—"}
      </span>
    </div>
  );
}
