import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. ADD THIS IMPORT
const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate(); // 2. ADD THIS DECLARATION
  const fetchOrders = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/orders/userorders", { userId: user.id });
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    if (user) fetchOrders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-[70vh]">
      <h2 className="text-3xl font-bold mb-8">My Orders</h2>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-6 items-center gap-4 border p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition">
            {/* Icon */}
            <div className="flex justify-center md:justify-start">
              <Package size={40} className="text-orange-600" />
            </div>

            {/* Items Summary */}
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600">
                {order.items.map((item, i) => (
                  <span key={i}>
                    {item.name} x {item.quantity}{i === order.items.length - 1 ? "" : ", "}
                  </span>
                ))}
              </p>
            </div>

            {/* Price */}
            <div className="text-center font-bold text-lg">
              ${order.amount}.00
            </div>

            {/* Status */}
            <div className="flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
              <p className="font-medium text-gray-700">{order.status}</p>
            </div>

            {/* Action */}
            {/* <button 
              onClick={fetchOrders}
              className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-200 transition"
            >
              Track Order
            </button> */}
            <button 
  onClick={() => navigate(`/ordertracker/${order._id}`)} // Pass the MongoDB ID
  className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg font-bold"
>
  Track Order
</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;