interface RatingBarProps {
  label: string;
  value: number; // 0–5
}

export default function RatingBar({ label, value }: RatingBarProps) {
  const pct = (value / 5) * 100;

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 w-44 shrink-0">{label}</span>
      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-trust-green rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-gray-700 w-8 text-right">
        {value.toFixed(1)}
      </span>
    </div>
  );
}
