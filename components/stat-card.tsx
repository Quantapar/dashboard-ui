"use client";

import type { StatKey } from "@/lib/data";
import { useLang } from "./lang-provider";
import { Sparkbar } from "./sparkbar";

type StatCardProps = {
  statKey: StatKey;
  value: string;
  change?: number;
  trend?: number[];
};

export function StatCard({ statKey, value, change, trend }: StatCardProps) {
  const { t } = useLang();
  const isPositive = change !== undefined && change >= 0;

  return (
    <div
      className="card-elevated group border-border hover:border-border-strong relative rounded-lg border p-5 sm:p-6 transition-[border-color] duration-200"
      style={{ transitionTimingFunction: "var(--ease-out)" }}
    >
      <div className="text-muted text-xs font-medium uppercase tracking-[0.08em]">
        {t.stats[statKey]}
      </div>

      <div
        className="text-fg mt-5 text-[28px] sm:text-4xl font-medium leading-none tracking-tight"
        translate="no"
      >
        {value}
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        {change !== undefined ? (
          <div className="tabular text-muted text-xs leading-none">
            <span className="sr-only">
              {isPositive ? t.increasedBy : t.decreasedBy}
            </span>
            <span dir="ltr" translate="no">
              <span
                style={{
                  color: isPositive ? "var(--positive)" : "var(--negative)",
                  marginInlineEnd: "4px",
                }}
              >
                {isPositive ? "+" : "−"}
              </span>
              {Math.abs(change).toFixed(1)}%
            </span>
          </div>
        ) : (
          <div />
        )}
        {trend && (
          <span className="inline-block leading-none">
            <Sparkbar data={trend} />
          </span>
        )}
      </div>
    </div>
  );
}
