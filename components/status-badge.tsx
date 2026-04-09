"use client";

import type { OrderStatus } from "@/lib/data";
import { useLang } from "./lang-provider";

export function StatusBadge({ status }: { status: OrderStatus }) {
  const { t } = useLang();
  return <span className="text-muted text-xs font-medium">{t.statuses[status]}</span>;
}
