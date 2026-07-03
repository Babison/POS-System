import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiSettings
} from 'react-icons/fi';

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-10">
        POS System
      </h1>

      <nav className="space-y-4">
        <div>🏠 Dashboard</div>
        <div>📦 Products</div>
        <div>📊 Inventory</div>
        <div>🧾 Sales</div>
        <div>👥 Customers</div>
        <div>⚙️ Settings</div>
      </nav>
    </div>
  );
}