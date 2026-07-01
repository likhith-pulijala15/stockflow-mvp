import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDashboard(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboard();
  }, []);

  if (!dashboard) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <Link
        to="/products"
        className="bg-blue-500 text-white px-4 py-2 rounded inline-block mb-6"
      >
        Manage Products
      </Link>

      <div className="grid grid-cols-3 gap-4">
        <div className="border p-4 rounded">
          <h2>Total Products</h2>
          <p className="text-2xl">{dashboard.totalProducts}</p>
        </div>

        <div className="border p-4 rounded">
          <h2>Total Quantity</h2>
          <p className="text-2xl">{dashboard.totalQuantity}</p>
        </div>

        <div className="border p-4 rounded">
          <h2>Low Stock Items</h2>
          <p className="text-2xl">{dashboard.lowStockItems.length}</p>
        </div>
      </div>
    </div>
  );
}
