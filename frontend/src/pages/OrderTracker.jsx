import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CheckCircle, ChefHat, Bike, Home, ArrowLeft } from 'lucide-react';
import ConfettiExplosion from 'react-confetti-explosion';
import toast from 'react-hot-toast';
import { API_URL } from '../api';

// Safe override for Leaflet default pin assets
delete L.Icon.Default.prototype._getIconUrl;

const restaurantIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});

const riderIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png",
    iconSize: [45, 45],
    iconAnchor: [22, 45],
});

const customerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1946/1946488.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
});

// Helper component to scale bounding views smoothly when coordinates resolve
function FitBounds({ positions }) {
    const map = useMap();
    useEffect(() => {
        if (positions && positions.length > 0) {
            map.fitBounds(positions, { padding: [50, 50], maxZoom: 15 });
        }
    }, [positions, map]);
    return null;
}

const OrderTracker = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const hasShownToast = useRef(false);
    const restaurantPos = [19.1136, 72.8697];
    
    // Core states
    const [mapPosition, setMapPosition] = useState([19.0760, 72.8777]);
    const [riderPos, setRiderPos] = useState(restaurantPos);
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

    // Initial success notifier toast
    useEffect(() => {
        if (!hasShownToast.current) {
            toast.success("Payment Successful! Your order is being prepared.", {
                duration: 5000,
                position: 'top-center',
                style: {
                    background: '#0f172a',
                    color: '#fff',
                    padding: '16px',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                },
                iconTheme: {
                    primary: '#f97316',
                    secondary: '#fff',
                },
            });
            hasShownToast.current = true;
        }
    }, []);

    // Polling database collection endpoint state maps
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await axios.get(`${API_URL}/orders/${orderId}`);
                if (res.data.success) {
                    const fetchedOrder = res.data.data;
                    const fetchedStatus = fetchedOrder.status;

                    setOrderData(fetchedOrder);

                    if (fetchedStatus !== status) {
                        setStatus(fetchedStatus);

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
        const interval = setInterval(fetchStatus, 5000);
        return () => clearInterval(interval);
    }, [orderId, status]);

    // Async Geocoder utilizing OpenStreetMap context engines
    useEffect(() => {
        const getCoordinates = async () => {
            if (!orderData?.address) return;

            try {
                const address = `${orderData?.address?.street || ""} ${orderData?.address?.city || ""} Mumbai`;
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
                );
                const data = await res.json();

                if (data.length > 0) {
                    setMapPosition([
                        parseFloat(data[0].lat),
                        parseFloat(data[0].lon)
                    ]);
                }
            } catch (err) {
                console.error("Geocoding Error:", err);
            }
        };

        getCoordinates();
    }, [orderData]);

    // Live Simulated Transit Motion Controller Loops
    useEffect(() => {
        if (status === "Order Placed" || status === "Food Processing") {
            setRiderPos(restaurantPos);
            return;
        }

        if (status === "Out for Delivery") {
            let goingToCustomer = true;

            const interval = setInterval(() => {
                setRiderPos(prev => {
                    const target = goingToCustomer ? mapPosition : restaurantPos;

                    const lat = prev[0] + (target[0] - prev[0]) * 0.05; 
                    const lng = prev[1] + (target[1] - prev[1]) * 0.05;

                    const distance = Math.sqrt(
                        Math.pow(target[0] - lat, 2) + Math.pow(target[1] - lng, 2)
                    );

                    if (distance < 0.0005) {
                        goingToCustomer = !goingToCustomer;
                    }

                    return [lat, lng];
                });
            }, 100);

            return () => clearInterval(interval);
        }

        if (status === "Delivered") {
            setRiderPos(mapPosition);
        }
    }, [status, mapPosition]);

    return (
        /* Strict screen-bounded heights prevent large monitor scroll leaks */
        <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-64px)] lg:h-[calc(100vh-64px)] lg:max-h-[calc(100vh-64px)] overflow-hidden bg-[#f8fafc] font-sans">
            
            {/* LEFT SIDE BLOCK: Map Workspace Display */}
            <div className="w-full lg:w-1/2 h-[50vh] lg:h-full bg-[#f1f5f9] relative z-10 flex-shrink-0">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none z-20" />

                {isExploding && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
                        <ConfettiExplosion particleCount={150} width={1000} />
                    </div>
                )}
                
                <MapContainer
                    center={mapPosition}
                    zoom={13}
                    style={{ width: "100%", height: "100%" }}
                    zoomControl={false}
                >
                    <FitBounds positions={[restaurantPos, mapPosition]} />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Polyline
                        positions={[restaurantPos, riderPos, mapPosition]}
                        pathOptions={{ color: "#f97316", weight: 4, dashArray: "5, 10" }}
                    />

                    {/* <Marker position={restaurantPos} icon={restaurantIcon}>
                        <Popup>Kitchen Hub</Popup>
                    </Marker> */}

                    <Marker position={riderPos} icon={riderIcon}>
                        <Popup>   <span className="font-bold text-slate-900 break-words">Delivery Partner</span></Popup>
                    </Marker>

                    <Marker position={mapPosition} icon={customerIcon}>
                        <Popup 
        maxWidth={220} 
        minWidth={140}
        className="custom-responsive-popup"
    >
        <div className="flex flex-col gap-0.5 p-1 font-sans text-xs sm:text-sm leading-tight text-slate-800">
            <span className="font-bold text-slate-900 break-words">
                {orderData?.address?.street || "Delivery Address"}
            </span>
            <span className="text-slate-500 font-medium">
                {orderData?.address?.city || "Mumbai"}
            </span>
        </div>
    </Popup>
                    </Marker>
                </MapContainer>

                {/* Floating Overlay Address Card */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:left-6 lg:translate-x-0 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 z-20 w-[90%] sm:w-auto max-w-sm">
                    <p className="text-[10px] sm:text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">
                        {status === "Delivered" ? "Order Complete" : "Delivering To"}
                    </p>
                    <p className="text-sm sm:text-base font-black text-slate-900 tracking-tight leading-snug">
                        {status === "Delivered"
                            ? `Successfully Delivered to ${orderData?.address?.city || "Kandivali"}`
                            : `${orderData?.address?.street || "MG Road"}, ${orderData?.address?.city || "Kandivali"}`
                        }
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE BLOCK: Content Process Tracking Panel */}
            <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-16 bg-white flex flex-col justify-start overflow-y-auto shadow-[-20px_0_50px_rgba(0,0,0,0.02)] z-20">
                <button 
                    onClick={() => navigate('/myorders')} 
                    className="group flex items-center text-slate-400 font-bold mb-6 lg:mb-10 hover:text-orange-500 transition-all w-fit"
                >
                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
                    Back to My Orders
                </button>

                <div className="mb-8 lg:mb-12">
                    <h1 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                        Your Order is <br />
                        <span className="text-orange-500 italic uppercase block mt-2">
                            {status === "Delivered" ? "Delivered!" : "On Its Way!"}
                        </span>
                    </h1>
                </div>

                {/* Milestones Vertical Pipeline Line */}
                <div className="space-y-8 lg:space-y-10 relative pb-4">
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
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-500 
                                    ${isDone ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-slate-50 text-slate-300'}`}>
                                    <Icon size={22} className={isCurrent ? "animate-bounce" : ""} />
                                </div>
                                
                                <div className="flex flex-col pt-1">
                                    <h3 className={`font-bold text-base lg:text-lg transition-colors duration-300 ${isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                                        {stage.label}
                                    </h3>
                                    <p className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${isDone ? 'text-slate-500' : 'text-slate-400'}`}>
                                        {stage.desc}
                                    </p>
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
