import { useEffect, useState } from "react";

import api from "../services/api";

function Orders() {
  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await api.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">
        Orders 📦
      </h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="border p-4 mb-4 rounded-lg"
        >
          <h2 className="text-2xl font-bold">
            Order #{order.id}
          </h2>

          <p>
            Total: Rs. {order.totalPrice}
          </p>

          <p>Status: {order.status}</p>

          <p>Address: {order.address}</p>
        </div>
      ))}
    </div>
  );
}

export default Orders;