"use client";

import { useEffect, useState } from "react";
import { orders, type OrderStatus } from "@/lib/data";
import { useLang } from "./lang-provider";
import { StatusBadge } from "./status-badge";

type Filter = "all" | OrderStatus;

const filters: Filter[] = [
  "all",
  "New",
  "Processing",
  "Shipped",
  "Done",
  "Return",
];

export function OrdersTable() {
  const { t } = useLang();
  const [filter, setFilter] = useState<Filter>("all");
  // Animate rows ONCE on initial mount. After that, filter changes
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

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

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
                className="hidden sm:table-cell text-dim text-start px-3 sm:px-6 py-3 text-2xs font-medium uppercase tracking-[0.12em]"
              >
                {t.columns.orderId}
              </th>
              <th
                scope="col"
                className="text-dim text-start px-3 sm:px-6 py-3 text-2xs font-medium uppercase tracking-[0.12em]"
              >
                {t.columns.customer}
              </th>
              <th
                scope="col"
                className="text-dim text-end px-3 sm:px-6 py-3 text-2xs font-medium uppercase tracking-[0.12em]"
              >
                {t.columns.amount}
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
            {filteredOrders.map((order, i) => (
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
