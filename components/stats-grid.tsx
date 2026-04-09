"use client";

import { statsByPeriod } from "@/lib/data";
import { usePeriod } from "./period-provider";
import { StatCard } from "./stat-card";

export function StatsGrid() {
  const { period } = usePeriod();
  const stats = statsByPeriod[period];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, i) => (
        <div
          key={stat.key}
          className="anim-fade-up"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <StatCard
            key={`${period}-${stat.key}`}
            statKey={stat.key}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
          />
        </div>
      ))}
    </div>
  );
}
