import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-10">
        POS System
      </h1>

      <div className="space-y-4">
        <Link className="block" to="/dashboard">
          Dashboard
        </Link>

        <Link className="block" to="/pos">
          POS
        </Link>
      </div>
    </div>
  );
}