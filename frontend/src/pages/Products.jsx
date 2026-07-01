import { useEffect, useState } from "react";
import api from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    quantity: "",
    sellingPrice: "",
  });

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({
        name: "",
        sku: "",
        quantity: "",
        sellingPrice: "",
      });

      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to create product");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <form onSubmit={handleSubmit} className="border p-4 rounded mb-6">
        <input
          className="border p-2 mr-2"
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />

        <input
          className="border p-2 mr-2"
          placeholder="SKU"
          value={formData.sku}
          onChange={(e) =>
            setFormData({
              ...formData,
              sku: e.target.value,
            })
          }
        />

        <input
          className="border p-2 mr-2"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={(e) =>
            setFormData({
              ...formData,
              quantity: e.target.value,
            })
          }
        />

        <input
          className="border p-2 mr-2"
          placeholder="Selling Price"
          value={formData.sellingPrice}
          onChange={(e) =>
            setFormData({
              ...formData,
              sellingPrice: e.target.value,
            })
          }
        />

        <button className="bg-blue-500 text-white px-4 py-2">
          Add Product
        </button>
      </form>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">SKU</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Price</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border p-2">{product.name}</td>

              <td className="border p-2">{product.sku}</td>

              <td className="border p-2">{product.quantity}</td>

              <td className="border p-2">{product.sellingPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
