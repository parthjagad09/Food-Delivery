import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 1. Added useNavigate
import { Package, Truck, CheckCircle, ChefHat, ExternalLink, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate(); // 2. Initialize navigate
  const url = "http://localhost:5000";

  // 3. Strict Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    
    // Redirect with 'replace' so they cannot click 'Back' to return
    navigate("/admin-login", { replace: true });
    toast.success("Logged out. Access restricted.");
  };

  const fetchOrders = async () => {
    const response = await axios.get(`${url}/api/orders/list`);
    if (response.data.success) {
      setOrders(response.data.data.reverse());
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      const response = await axios.patch(`${url}/api/orders/update-status`, {
        orderId,
        newStatus: status
      });
      if (response.data.success) {
        await fetchOrders(); 
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };
  
  useEffect(() => {
    fetchOrders();
  }, []);

  // return (
  //   <div className="p-10 bg-slate-50 min-h-screen">
  //     {/* 4. Updated Header with Logout Button */}
  //     <div className="flex justify-between items-center mb-10">
  //       <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
  //         <Package className="text-orange-500" /> Active Shipments
  //       </h1>
  //       <button 
  //         onClick={handleLogout}
  //         className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-100 transition-all"
  //       >
  //         <LogOut size={18} /> Logout
  //       </button>
  //     </div>

  //     <div className="grid gap-6">
  //       {orders.map((order) => (
  //         <div key={order._id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
  //           <div className="flex-1">
  //              <div className="flex items-center gap-2 mb-2">
  //                <span className="text-[10px] font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-500 uppercase tracking-widest">
  //                  ID: {order._id.slice(-6)}
  //                </span>
  //                <span className="text-[10px] font-bold bg-orange-100 px-3 py-1 rounded-full text-orange-600 uppercase tracking-widest">
  //                  {order.status}
  //                </span>
  //              </div>
  //              <h3 className="text-lg font-black text-slate-800">
  //                 {order.address.city} Delivery — {order.address.street}
  //              </h3>
  //           </div>

  //           <div className="flex flex-wrap gap-2">
  //             <button onClick={() => handleStatusChange(order._id, "Food Processing")} className="btn-status">
  //               <ChefHat size={16}/> Prep
  //             </button>
  //             <button onClick={() => handleStatusChange(order._id, "Out for Delivery")} className="btn-status">
  //               <Truck size={16}/> Out
  //             </button>
  //             <button onClick={() => handleStatusChange(order._id, "Delivered")} className="btn-status text-green-600 bg-green-50 hover:bg-green-100">
  //               <CheckCircle size={16}/> Deliver
  //             </button>
  //             <a href={`/ordertracker/${order._id}`} target="_blank" rel="noreferrer" className="p-3 bg-slate-900 text-white rounded-2xl">
  //               <ExternalLink size={18}/>
  //             </a>
  //           </div>
  //         </div>
  //       ))}
  //     </div>

  //     <style jsx>{`
  //       .btn-status {
  //         display: flex;
  //         align-items: center;
  //         gap: 8px;
  //         padding: 12px 20px;
  //         border-radius: 16px;
  //         font-weight: 800;
  //         font-size: 14px;
  //         background: #f8fafc;
  //         color: #64748b;
  //         transition: all 0.2s;
  //       }
  //       .btn-status:hover { background: #f1f5f9; color: #f97316; }
  //     `}</style>
  //   </div>
  // );
  return (
  <div className="p-4 sm:p-10 bg-slate-50 min-h-screen">
    {/* Header: Adjusted padding and font size for mobile */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-10">
      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
        <Package className="text-orange-500" /> Active Shipments
      </h1>
      <button 
        onClick={handleLogout}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-100 transition-all"
      >
        <LogOut size={18} /> Logout
      </button>
    </div>

    {/* Responsive Grid */}
    <div className="grid gap-4 sm:gap-6">
      {orders.map((order) => (
        <div key={order._id} className="bg-white p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] shadow-sm border border-slate-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          
          {/* Order Info Section */}
          <div className="flex-1 w-full">
             <div className="flex items-center gap-2 mb-2">
               <span className="text-[10px] font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-500 uppercase tracking-widest">
                 ID: {order._id.slice(-6)}
               </span>
               <span className="text-[10px] font-bold bg-orange-100 px-3 py-1 rounded-full text-orange-600 uppercase tracking-widest">
                 {order.status}
               </span>
             </div>
             <h3 className="text-base sm:text-lg font-black text-slate-800 leading-tight">
                {order.address.city} Delivery — <span className="text-slate-500 font-bold">{order.address.street}</span>
             </h3>
          </div>

          {/* Action Buttons: Wrap on mobile, single line on desktop */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full lg:w-auto">
            <button onClick={() => handleStatusChange(order._id, "Food Processing")} className="btn-status flex-1 sm:flex-none">
              <ChefHat size={16}/> <span className="sm:inline">Prep</span>
            </button>
            <button onClick={() => handleStatusChange(order._id, "Out for Delivery")} className="btn-status flex-1 sm:flex-none">
              <Truck size={16}/> <span className="sm:inline">Out</span>
            </button>
            <button onClick={() => handleStatusChange(order._id, "Delivered")} className="btn-status flex-1 sm:flex-none text-green-600 bg-green-50 hover:bg-green-100">
              <CheckCircle size={16}/> <span className="sm:inline">Deliver</span>
            </button>
            
            {/* View Tracker: Full width on very small screens */}
            <a 
              href={`/ordertracker/${order._id}`} 
              target="_blank" 
              rel="noreferrer" 
              className="p-3 bg-slate-900 text-white rounded-xl sm:rounded-2xl hover:bg-orange-500 transition-colors flex items-center justify-center"
            >
              <ExternalLink size={18}/>
            </a>
          </div>
        </div>
      ))}
    </div>

    {/* Adjusted Button Styles for better tap targets on mobile */}
    <style jsx>{`
      .btn-status {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 10px 14px;
        border-radius: 12px;
        font-weight: 800;
        font-size: 12px;
        background: #f8fafc;
        color: #64748b;
        transition: all 0.2s;
        min-width: 80px;
      }
      @media (min-width: 640px) {
        .btn-status {
          padding: 12px 20px;
          border-radius: 16px;
          font-size: 14px;
          gap: 8px;
        }
      }
      .btn-status:hover { background: #f1f5f9; color: #f97316; }
    `}</style>
  </div>
);
};

export default AdminOrders;