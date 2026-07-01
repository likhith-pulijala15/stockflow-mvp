import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

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
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

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
