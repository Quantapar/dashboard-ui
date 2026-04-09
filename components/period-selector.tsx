"use client";

import { periods } from "@/lib/data";
import { useLang } from "./lang-provider";
import { usePeriod } from "./period-provider";

export function PeriodSelector() {
  const { t } = useLang();
  const { period, setPeriod } = usePeriod();

  return (
    <div
      role="group"
      aria-label={t.selectPeriod}
      className="border-border inline-flex h-9 items-center overflow-hidden rounded-md border"
    >
      {periods.map((p, i) => {
        const isActive = period === p;
        return (
          <button
            key={p}
            type="button"
            onClick={() => setPeriod(p)}
            aria-pressed={isActive}
            className={`focus-visible:bg-surface-hover h-full px-3 text-xs font-medium outline-none transition-[color,background-color] duration-200 ${
              i > 0 ? "border-border border-s" : ""
            } ${
              isActive
                ? "bg-surface-hover text-fg"
                : "text-muted hover:text-fg"
            }`}
            style={{ transitionTimingFunction: "var(--ease-out)" }}
          >
            {t.periods[p]}
          </button>
        );
      })}
    </div>
  );
}
