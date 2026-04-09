"use client";

import { useLang } from "./lang-provider";
import { LangToggle } from "./lang-toggle";
import { PeriodSelector } from "./period-selector";

export function DashboardHeader() {
  const { t } = useLang();

  return (
    <header className="anim-fade-up mb-10 sm:mb-14 flex flex-wrap items-center justify-between gap-4 sm:gap-6">
      <div className="min-w-0">
        <h1 className="text-fg text-balance text-2xl font-medium tracking-tight">
          {t.dashboard}
        </h1>
        <p className="text-dim mt-1 text-sm">{t.overview}</p>
      </div>
      <div className="flex items-center gap-3">
        <PeriodSelector />
        <LangToggle />
      </div>
    </header>
  );
}
