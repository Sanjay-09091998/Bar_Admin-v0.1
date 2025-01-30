import React from "react";
import Sidebar from "./dashboard/Sidebar";
import TopStats from "./dashboard/TopStats";
import BarList from "./dashboard/BarList";
import RecentOrders from "./dashboard/RecentOrders";
import InventoryAlerts from "./dashboard/InventoryAlerts";

interface HomeProps {
  collapsed?: boolean;
}

const Home = ({ collapsed = false }: HomeProps) => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar collapsed={collapsed} />
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="text-sm text-muted-foreground">
            Welcome back, Admin
          </div>
        </div>

        <TopStats />

        <div className="space-y-6">
          <BarList />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecentOrders />
            <InventoryAlerts />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
