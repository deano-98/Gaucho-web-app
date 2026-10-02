import { Minus, Plus } from "lucide-react";
export function QuantitySelector({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (value: number) => void;
  label: string;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-black/10 bg-white">
      <button
        type="button"
        aria-label={`Decrease ${label}`}
        onClick={() => onChange(Math.max(1, value - 1))}
        className="grid h-9 w-9 place-items-center"
      >
        <Minus size={15} />
      </button>
      <span aria-live="polite" className="w-7 text-center text-sm font-black">
        {value}
      </span>
      <button
        type="button"
        aria-label={`Increase ${label}`}
        onClick={() => onChange(Math.min(50, value + 1))}
        className="grid h-9 w-9 place-items-center"
      >
        <Plus size={15} />
      </button>
    </div>
  );
}
