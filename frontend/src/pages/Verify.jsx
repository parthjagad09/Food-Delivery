import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      // Calling the backend route you just created
      const response = await axios.post("http://localhost:5000/api/orders/verify", { success, orderId });
      
      if (response.data.success) {
        // SUCCESS: Direct to live map tracking
        navigate(`/ordertracker/${orderId}`);
      } else {
        // FAILURE: Send back to cart
        navigate("/cart");
      }
    };
    verify();
  }, [success, orderId]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 border-4 border-slate-200 border-t-orange-500 rounded-full animate-spin"></div>
      <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Validating Payment...</p>
    </div>
  );
};

export default Verify;