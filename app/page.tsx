import { DashboardHeader } from "@/components/dashboard-header";
import { LangProvider } from "@/components/lang-provider";
import { OrdersTable } from "@/components/orders-table";
import { PeriodProvider } from "@/components/period-provider";
import { StatsGrid } from "@/components/stats-grid";

export default function Page() {
  return (
    <LangProvider>
      <PeriodProvider>
        <main
          id="main"
          className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 md:px-8 md:py-20"
        >
          <DashboardHeader />
          <StatsGrid />
          <div className="mt-10 sm:mt-14 md:mt-16">
            <OrdersTable />
          </div>
        </main>
      </PeriodProvider>
    </LangProvider>
  );
}
