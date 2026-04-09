"use client";

import { useEffect, useState } from "react";
import { orders, type OrderStatus } from "@/lib/data";
import { useLang } from "./lang-provider";
import { StatusBadge } from "./status-badge";

type Filter = "all" | OrderStatus;
type SortKey = "orderId" | "customer" | "amount";
type SortDir = "asc" | "desc";

const filters: Filter[] = [
  "all",
  "New",
  "Processing",
  "Shipped",
  "Done",
  "Return",
];

const parseAmount = (s: string) => parseFloat(s.replace(/[$,]/g, ""));

function SortArrow({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return null;
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d={dir === "asc" ? "M2.5 6L5 3.5L7.5 6" : "M2.5 4L5 6.5L7.5 4"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function OrdersTable() {
  const { t } = useLang();
  const [filter, setFilter] = useState<Filter>("all");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  // Animate rows ONCE on initial mount. After that, filter/sort changes
  // are instant snaps — otherwise React's reconciliation makes the
  // surviving rows appear "before" the new ones, which looks broken.
  const [animateRows, setAnimateRows] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setAnimateRows(false), 800);
    return () => clearTimeout(id);
  }, []);

  const handleFilterChange = (f: Filter) => {
    setAnimateRows(false);
    setFilter(f);
  };

  const handleSort = (key: SortKey) => {
    setAnimateRows(false);
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const sortedOrders = sortKey
    ? [...filteredOrders].sort((a, b) => {
        let aVal: string | number;
        let bVal: string | number;
        if (sortKey === "amount") {
          aVal = parseAmount(a.amount);
          bVal = parseAmount(b.amount);
        } else if (sortKey === "orderId") {
          aVal = a.id;
          bVal = b.id;
        } else {
          aVal = a.customer;
          bVal = b.customer;
        }
        if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
        return 0;
      })
    : filteredOrders;

  const ariaSortFor = (key: SortKey): "ascending" | "descending" | "none" =>
    sortKey === key ? (sortDir === "asc" ? "ascending" : "descending") : "none";

  const sortBtnClass = (key: SortKey) =>
    `inline-flex items-center gap-1.5 outline-none transition-colors duration-150 ${
      sortKey === key ? "text-fg" : "hover:text-muted"
    }`;

  return (
    <section className="anim-fade-up" style={{ animationDelay: "300ms" }}>
      <header className="mb-5 flex items-baseline justify-between gap-4">
        <h2 className="text-fg text-base font-medium tracking-tight">
          {t.recentOrders}
        </h2>
        <span className="text-dim text-xs uppercase tracking-[0.08em]">
          <span className="tabular" dir="ltr" translate="no">
            {filteredOrders.length}
          </span>{" "}
          {t.entries}
        </span>
      </header>

      <div
        role="group"
        aria-label={t.filterByStatus}
        className="mb-5 flex flex-wrap items-center gap-2"
      >
        {filters.map((f) => {
          const isActive = filter === f;
          const label = f === "all" ? t.all : t.statuses[f];
          return (
            <button
              key={f}
              type="button"
              onClick={() => handleFilterChange(f)}
              aria-pressed={isActive}
              className={`focus-visible:border-accent inline-flex h-7 items-center rounded-md border px-3 text-xs font-medium outline-none transition-[transform,color,border-color,background-color] duration-200 active:scale-[0.97] ${
                isActive
                  ? "border-border-strong bg-surface-hover text-fg"
                  : "border-border text-muted hover:border-border-strong hover:text-fg"
              }`}
              style={{ transitionTimingFunction: "var(--ease-out)" }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="card-elevated border-border h-[440px] sm:h-[560px] overflow-hidden rounded-lg border">
        <div className="h-full overflow-y-auto">
        <table className="w-full border-collapse" aria-label={t.recentOrders}>
          <thead className="bg-surface sticky top-0 z-10">
            <tr className="border-border border-b">
              <th
                scope="col"
                aria-sort={ariaSortFor("orderId")}
                className="hidden sm:table-cell text-dim text-start px-3 sm:px-6 py-3 text-2xs font-medium uppercase tracking-[0.12em]"
              >
                <button
                  type="button"
                  onClick={() => handleSort("orderId")}
                  className={sortBtnClass("orderId")}
                  style={{ transitionTimingFunction: "var(--ease-out)" }}
                >
                  {t.columns.orderId}
                  <SortArrow active={sortKey === "orderId"} dir={sortDir} />
                </button>
              </th>
              <th
                scope="col"
                aria-sort={ariaSortFor("customer")}
                className="text-dim text-start px-3 sm:px-6 py-3 text-2xs font-medium uppercase tracking-[0.12em]"
              >
                <button
                  type="button"
                  onClick={() => handleSort("customer")}
                  className={sortBtnClass("customer")}
                  style={{ transitionTimingFunction: "var(--ease-out)" }}
                >
                  {t.columns.customer}
                  <SortArrow active={sortKey === "customer"} dir={sortDir} />
                </button>
              </th>
              <th
                scope="col"
                aria-sort={ariaSortFor("amount")}
                className="text-dim text-end px-3 sm:px-6 py-3 text-2xs font-medium uppercase tracking-[0.12em]"
              >
                <button
                  type="button"
                  onClick={() => handleSort("amount")}
                  className={sortBtnClass("amount")}
                  style={{ transitionTimingFunction: "var(--ease-out)" }}
                >
                  {t.columns.amount}
                  <SortArrow active={sortKey === "amount"} dir={sortDir} />
                </button>
              </th>
              <th
                scope="col"
                className="text-dim text-start px-3 sm:px-6 py-3 text-2xs font-medium uppercase tracking-[0.12em]"
              >
                {t.columns.status}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order, i) => (
              <tr
                key={order.id}
                className={`border-border/60 hover:bg-surface-hover group cursor-pointer border-b transition-colors duration-150 last:border-b-0 ${animateRows ? "anim-fade-in" : ""}`}
                style={{
                  transitionTimingFunction: "var(--ease-out)",
                  ...(animateRows && {
                    animationDelay: `${360 + i * 35}ms`,
                  }),
                }}
              >
                <td
                  className="hidden sm:table-cell text-muted tabular text-start px-3 sm:px-6 py-4 font-mono text-xs"
                  dir="ltr"
                  translate="no"
                >
                  {order.id}
                </td>
                <td
                  className="text-fg text-start max-w-[120px] sm:max-w-[220px] truncate px-3 sm:px-6 py-4 text-sm"
                  translate="no"
                >
                  {order.customer}
                </td>
                <td
                  className="text-fg tabular text-end px-3 sm:px-6 py-4 font-mono text-sm"
                  dir="ltr"
                  translate="no"
                >
                  {order.amount}
                </td>
                <td className="text-start px-3 sm:px-6 py-4">
                  <div className="flex items-center justify-between">
                    <StatusBadge status={order.status} />
                    <span
                      aria-hidden
                      className="text-muted transition-all duration-200 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-active:scale-95"
                      style={{ transitionTimingFunction: "var(--ease-out)" }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </section>
  );
}
