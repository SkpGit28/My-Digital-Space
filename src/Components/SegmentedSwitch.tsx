import { useState, useRef } from "react";
import { track } from "@/lib/analytics";

const defaultOptions: { label: string; value: "bites" | "deep" }[] = [
  { label: "UX Bites", value: "bites" },
  { label: "Deep Dive", value: "deep" },
];

export default function SegmentedSwitch({
  value = "bites",
  onChange,
  options = defaultOptions,
}: {
  value: "bites" | "deep";
  onChange: (value: "bites" | "deep") => void;
  options?: { label: string; value: "bites" | "deep" }[];
}) {
  const [focusIdx, setFocusIdx] = useState(options.findIndex(o => o.value === value));
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div
      role="tablist"
      aria-label="Case study type"
      className="inline-flex rounded-lg bg-card border border-border overflow-hidden shadow-sm"
    >
      {options.map((opt, i) => (
        <button
          key={opt.value}
          ref={el => { tabRefs.current[i] = el; }}
          role="tab"
          aria-selected={value === opt.value}
          tabIndex={value === opt.value ? 0 : -1}
          className={`px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-brand ${value === opt.value ? "bg-brand text-white" : "text-muted hover:bg-card/70"}`}
          onClick={() => {
            onChange(opt.value);
            track("segment_select", { tab: opt.value });
          }}
          onKeyDown={e => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
              e.preventDefault();
              let next = (i + (e.key === "ArrowRight" ? 1 : -1) + options.length) % options.length;
              setFocusIdx(next);
              tabRefs.current[next]?.focus();
            }
            if ((e.key === "Enter" || e.key === " ") && value !== opt.value) {
              onChange(opt.value);
              track("segment_select", { tab: opt.value });
            }
          }}
          aria-controls={`tabpanel-${opt.value}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
