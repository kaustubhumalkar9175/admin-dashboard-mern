import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getDashboardStats } from "../api/dashboard";

import StatCard from "../components/dashboard/StatCard";
import CategoryBarChart from "../components/dashboard/CategoryBarChart";
import StatusPieChart from "../components/dashboard/StatusPieChart";
import MonthlyLineChart from "../components/dashboard/MonthlyLineChart";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  if (!stats) {
    return (
      <DashboardLayout>
        <p>Loading dashboard...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Records" value={stats.totalRecords} />
        <StatCard title="Total Amount" value={stats.totalAmount} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <CategoryBarChart data={stats.recordsByCategory} />
        <StatusPieChart data={stats.recordsByStatus} />
      </div>

      <MonthlyLineChart data={stats.recordsByMonth} />
    </DashboardLayout>
  );
};

export default Dashboard;
