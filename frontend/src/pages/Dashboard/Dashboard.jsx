import { useEffect, useState } from 'react';
import dashboardService from '../../services/dashboard.service';

export default function Dashboard() {
  const [data, setData] =
    useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const res =
      await dashboardService.getSummary();

    setData(res.data);
  };

  if (!data)
    return <div>Loading...</div>;

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

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
    </>
  );
}

function Card({
  title,
  value
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h3 className="text-gray-500">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-4">
        {value}
      </p>
    </div>
  );
}