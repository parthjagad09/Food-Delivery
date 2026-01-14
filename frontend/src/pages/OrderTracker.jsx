import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { CheckCircle, ChefHat, Bike, Home, ArrowLeft } from 'lucide-react';
import ConfettiExplosion from 'react-confetti-explosion';
import toast from 'react-hot-toast';

const OrderTracker = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    
    // Use a ref to track if the success toast has already been displayed
    const hasShownToast = useRef(false);
    
    // Core state management
    const [status, setStatus] = useState("Order Placed"); 
    const [orderData, setOrderData] = useState(null);
    const [isExploding, setIsExploding] = useState(false);

    const stages = [
        { label: "Order Placed", icon: CheckCircle, desc: "We have received your order." },
        { label: "Food Processing", icon: ChefHat, desc: "Our chef is preparing your meal." },
        { label: "Out for Delivery", icon: Bike, desc: "Your rider is on the way!" },
        { label: "Delivered", icon: Home, desc: "Enjoy your meal!" }
    ];

    const currentIdx = stages.findIndex(s => s.label === status);

    useEffect(() => {
        // Only show the toast if it hasn't been shown yet in this component lifecycle
        if (!hasShownToast.current) {
            toast.success("Payment Successful! Your order is being prepared.", {
                duration: 5000,
                position: 'top-center',
                style: {
                    background: '#0f172a', // Matches slate-900
                    color: '#fff',
                    padding: '16px',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                },
                iconTheme: {
                    primary: '#f97316', // Matches orange-500
                    secondary: '#fff',
                },
            });
            // Mark as true so subsequent renders or Strict Mode double-invocations are ignored
            hasShownToast.current = true;
        }
    }, []);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                // Adjust this URL to match your backend port/route
                const res = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
                if (res.data.success) {
                    const fetchedOrder = res.data.data;
                    const fetchedStatus = fetchedOrder.status;

                    setOrderData(fetchedOrder); // Captures address: {city: 'Kandivali', ...}

                    if (fetchedStatus !== status) {
                        setStatus(fetchedStatus);
                        
                        // Trigger confetti on the exact moment of delivery
                        if (fetchedStatus === "Delivered") {
                            setIsExploding(true);
                            setTimeout(() => setIsExploding(false), 4000);
                        }
                    }
                }
            } catch (err) {
                console.error("Fetch Error:", err);
            }
        };

        fetchStatus();
        // Polling: Syncs with MongoDB every 5 seconds
        const interval = setInterval(fetchStatus, 5000); 
        return () => clearInterval(interval);
    }, [orderId, status]);

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#f8fafc] font-sans">
            {/* LEFT SIDE: Live Simulation Map */}
            <div className="w-full md:w-3/5 h-[45vh] md:h-screen bg-[#f1f5f9] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                
                {isExploding && (
                    <div className="absolute top-1/2 left-1/2 z-50">
                        <ConfettiExplosion particleCount={200} width={1600} />
                    </div>
                )}

                <svg viewBox="0 0 800 600" className="w-full h-full p-20 mb-20 hidden md:block">
                    {/* Background Static Path */}
                    <path d="M 100 500 Q 250 150 700 100" fill="transparent" stroke="#e2e8f0" strokeWidth="8" strokeLinecap="round" />
                    
                    {/* Orange Trail - Fills 100% when Delivered */}
                    <motion.path
                        d="M 100 500 Q 250 150 700 100"
                        fill="transparent"
                        stroke="#f97316"
                        strokeWidth="8"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: currentIdx / (stages.length - 1) }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />

                    {/* Home Destination Icon */}
                    <g transform="translate(680, 85)">
                        <circle r="30" fill="#f97316" className="animate-ping opacity-10" />
                        <circle r="18" fill="#f97316" />
                        <Home size={20} color="white" x="-10" y="-10" />
                    </g>

                    {/* Moving Rider - Physically moves to the home icon when Delivered */}
                    <motion.g
                        initial={{ offsetDistance: "0%" }}
                        animate={{ offsetDistance: `${(currentIdx / (stages.length - 1)) * 100}%` }}
                        style={{ offsetPath: "path('M 100 500 Q 250 150 700 100')" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    >
                        <foreignObject width="70" height="70" x="-35" y="-35">
                            <div className="bg-white p-4 rounded-3xl shadow-2xl border-2 border-orange-500 flex items-center justify-center">
                                <Bike size={32} className="text-orange-500" />
                            </div>
                        </foreignObject>
                    </motion.g>
                </svg>

                {/* Residential Insight Overlay */}
                {/* <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-md p-6 rounded-[2rem] shadow-xl border border-white z-20">
                    <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">
                        {status === "Delivered" ? "Order Complete" : "Delivering To"}
                    </p>
                    <p className="text-sm font-black text-slate-900 tracking-tight">
                        {status === "Delivered" 
                            ? `Successfully Delivered to ${orderData?.address.city || 'Kandivali'}` 
                            : `${orderData?.address.street || 'MG Road'}, ${orderData?.address.city || 'Kandivali'}`
                        }
                    </p>
                </div> */}
                <div
  className="
    absolute 
    bottom-4 left-1/2 -translate-x-1/2
    sm:bottom-8 sm:left-8 sm:translate-x-0
    bg-white/90 backdrop-blur-md
    p-4 sm:p-6
    rounded-2xl sm:rounded-[2rem]
    shadow-xl border border-white
    z-20
    w-[90%] sm:w-auto
    max-w-sm
  "
>
  <p className="text-[10px] sm:text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">
    {status === "Delivered" ? "Order Complete" : "Delivering To"}
  </p>

  <p className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-snug">
    {status === "Delivered"
      ? `Successfully Delivered to ${orderData?.address.city || "Kandivali"}`
      : `${orderData?.address.street || "MG Road"}, ${orderData?.address.city || "Kandivali"}`
    }
  </p>
</div>

            </div>

            {/* RIGHT SIDE: Information Panel */}
            <div className="w-full md:w-2/5 p-8 md:p-16 bg-white flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.02)] z-30">
                <button onClick={() => navigate('/myorders')} className="group flex items-center text-slate-400 font-bold mb-12 hover:text-orange-500 transition-all">
                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to My Orders
                </button>

                <div className="mb-14">
                    <h1 className="text-4xl font-black text-slate-900 leading-tight">Your Order is <br /> 
                        <span className="text-orange-500 italic uppercase">
                            {status === "Delivered" ? "Delivered!" : "On Its Way!"}
                        </span>
                    </h1>
                </div>

                {/* Stepper logic synced to DB status */}
                <div className="space-y-10 relative">
                    <div className="absolute left-[23px] top-2 bottom-2 w-[2px] bg-slate-100" />
                    
                    {stages.map((stage, idx) => {
                        const Icon = stage.icon;
                        const isDone = idx <= currentIdx;
                        const isCurrent = idx === currentIdx;

                        return (
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                key={idx} 
                                className="flex items-start gap-6 relative"
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 
                                    ${isDone ? 'bg-orange-500 text-white shadow-lg' : 'bg-slate-50 text-slate-200'}`}>
                                    <Icon size={22} className={isCurrent ? "animate-bounce" : ""} />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className={`font-bold text-lg ${isDone ? 'text-slate-900' : 'text-slate-200'}`}>{stage.label}</h3>
                                    <p className={`text-sm font-medium ${isDone ? 'text-slate-500' : 'text-slate-100'}`}>{stage.desc}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default OrderTracker;