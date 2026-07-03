import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import dashboardService from "../../services/dashboard.service";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const res =
      await dashboardService.getSummary();

    setData(res.data);
  };

  if (!data)
    return (
      <DashboardLayout>
        Loading...
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="grid grid-cols-4 gap-6">
        <Card
          title="Products"
          value={data.totalProducts}
        />

        <Card
          title="Categories"
          value={data.totalCategories}
        />

        <Card
          title="Sales Today"
          value={data.totalSalesToday}
        />

        <Card
          title="Revenue"
          value={`₹${data.revenueToday}`}
        />
      </div>
    </DashboardLayout>
  );
}

function Card({
  title,
  value,
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-gray-500">
        {title}
      </h2>

      <h1 className="text-4xl font-bold mt-4">
        {value}
      </h1>
    </div>
  );
}