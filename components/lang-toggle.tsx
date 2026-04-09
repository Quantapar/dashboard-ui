"use client";

import { useLang } from "./lang-provider";

export function LangToggle() {
  const { lang, setLang, t } = useLang();
  const next = lang === "en" ? "ar" : "en";

  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      aria-label={t.switchLanguage}
      className="border-border hover:border-border-strong focus-visible:border-accent text-muted hover:text-fg inline-flex h-9 items-center gap-2 rounded-md border px-3.5 text-xs font-medium outline-none transition-[transform,color,border-color] duration-200 active:scale-[0.97]"
      style={{ transitionTimingFunction: "var(--ease-out)" }}
    >
      <span
        className={lang === "en" ? "text-fg" : "text-faint"}
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        EN
      </span>
      <span className="text-faint" aria-hidden>
        /
      </span>
      <span
        className={lang === "ar" ? "text-fg" : "text-faint"}
        style={{ fontFamily: "var(--font-arabic)" }}
      >
        عربي
      </span>
    </button>
  );
}
