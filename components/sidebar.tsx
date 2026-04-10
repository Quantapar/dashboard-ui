"use client";

import { useState } from "react";
import { useLang } from "./lang-provider";

type NavKey = "dashboard" | "orders" | "wallet" | "settings";

function DashboardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function OrdersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="3" y="4" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 2.5h6v3H6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6 9h6 M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="2" y="5" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 8h14" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="13" cy="11" r="0.9" fill="currentColor" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M2 5h4m4 0h6 M2 9h8m4 0h2 M2 13h2m4 0h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="8" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="5" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path
        d="M3.5 2L6.5 5L3.5 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const navItems: { key: NavKey; Icon: () => React.ReactElement }[] = [
  { key: "dashboard", Icon: DashboardIcon },
  { key: "orders", Icon: OrdersIcon },
  { key: "wallet", Icon: WalletIcon },
  { key: "settings", Icon: SettingsIcon },
];

export function Sidebar() {
  const { t } = useLang();
  const [active, setActive] = useState<NavKey>("dashboard");
  const [expanded, setExpanded] = useState(false);

  // Asymmetric label reveal — fades in after width animation, fades out instantly
  const labelClass = `overflow-hidden whitespace-nowrap transition-[opacity,max-width] duration-150 ${
    expanded
      ? "opacity-100 max-w-[140px] delay-150"
      : "opacity-0 max-w-0 pointer-events-none delay-0"
  }`;

  // All rows share the same shape so icons never reflow during the animation
  const rowBase = "mx-3 flex h-9 items-center gap-3";

  return (
    <aside
      aria-label="Primary"
      className={`group/sidebar relative hidden md:flex sticky top-0 h-screen shrink-0 flex-col border-e border-white/[0.04] transition-[width] duration-300 ${
        expanded ? "w-[200px]" : "w-[60px]"
      }`}
      style={{ transitionTimingFunction: "var(--ease-out)" }}
    >
      {/* Inner column — clips labels but lets the floating toggle escape */}
      <div className="flex h-full flex-col overflow-hidden py-4">
        {/* Brand mark */}
        <div className={rowBase}>
          <div
            aria-hidden
            className="grid h-9 w-9 shrink-0 place-items-center rounded-md"
            style={{
              background: "color-mix(in srgb, var(--accent) 14%, transparent)",
            }}
          >
            <span
              className="block h-2 w-2 rounded-full"
              style={{ background: "var(--accent)" }}
            />
          </div>
          <span
            className={`text-fg text-sm font-medium tracking-tight ${labelClass}`}
          >
            {t.dashboard}
          </span>
        </div>

        {/* Collapse toggle — sits directly below the brand mark */}
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={expanded}
          className={`${rowBase} text-muted hover:bg-surface-hover hover:text-fg mt-2 rounded-md outline-none transition-[color,background-color] duration-200 active:scale-[0.97]`}
          style={{ transitionTimingFunction: "var(--ease-out)" }}
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center">
            <span
              className={`chevron-flip inline-flex transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              }`}
              style={{ transitionTimingFunction: "var(--ease-out)" }}
            >
              <ChevronIcon />
            </span>
          </span>
          <span className={`text-xs font-medium ${labelClass}`}>Collapse</span>
        </button>

        {/* Nav items */}
        <nav className="mt-6 flex flex-col gap-1">
          {navItems.map(({ key, Icon }) => {
            const isActive = active === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActive(key)}
                aria-label={t.nav[key]}
                aria-current={isActive ? "page" : undefined}
                title={!expanded ? t.nav[key] : undefined}
                className={`${rowBase} rounded-md outline-none transition-[color,background-color] duration-200 active:scale-[0.97] ${
                  isActive
                    ? "bg-surface-hover text-fg"
                    : "text-muted hover:bg-surface-hover hover:text-fg"
                }`}
                style={{ transitionTimingFunction: "var(--ease-out)" }}
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center">
                  <Icon />
                </span>
                <span className={`text-xs font-medium ${labelClass}`}>
                  {t.nav[key]}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto" />

        {/* User identity */}
        <div className={`${rowBase} mb-1`}>
          <div
            aria-hidden
            className="text-2xs text-muted grid h-9 w-9 shrink-0 place-items-center rounded-full font-medium tracking-[0.04em]"
            style={{
              background: "var(--surface-hover)",
              border: "1px solid var(--border)",
            }}
          >
            Q
          </div>
          <div
            className={`overflow-hidden transition-[opacity,max-width] duration-150 ${
              expanded
                ? "opacity-100 max-w-[140px] delay-150"
                : "opacity-0 max-w-0 pointer-events-none delay-0"
            }`}
          >
            <div className="text-fg truncate text-xs font-medium whitespace-nowrap">
              Quantapar
            </div>
            <div className="text-dim truncate text-2xs whitespace-nowrap">
              Pro
            </div>
          </div>
        </div>
      </div>

    </aside>
  );
}
