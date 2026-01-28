import React, { useState } from 'react'; // Add useState
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import axios from 'axios'; // Import axios for the API call
import toast from 'react-hot-toast';
import { API_URL } from '../api';
const Cart = () => {
  const { cartItems, addToCart, removeFromCart, subtotal,token } = useCart();
  const deliveryFee = subtotal > 0 ? 5 : 0;
  const total = subtotal + deliveryFee;

  // 1. State for Delivery Information
  const [data, setData] = useState({
    firstName: "", lastName: "", email: "", street: "",
    city: "", state: "", zipcode: "", country: "", phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  // 2. Function to Place Order
  // const placeOrder = async (event) => {
  //   event.preventDefault();
    
  //   // Build order data object
  //   const orderData = {
  //     address: data,
  //     items: cartItems,
  //     amount: total,
  //     // Get userId from local storage (assuming it's stored during login)
  //     userId: JSON.parse(localStorage.getItem("user")).id 
  //   };

  //   try {
  //     const response = await axios.post("http://localhost:5000/api/orders/place", orderData);
  //     if (response.data.success) {
  //       toast.success("Order Placed Successfully!");
  //       // Clear cart or redirect to success page here
  //     }
  //   } catch (error) {
  //     toast.error("Error placing order");
  //     console.error(error);
  //   }
  // };
  const placeOrder = async (event) => {
  event.preventDefault();
  
  const orderData = {
    address: data,
    items: cartItems,
    amount: total,
    userId: JSON.parse(localStorage.getItem("user")).id 
  };

  try {
    // const response = await axios.post("http://localhost:5000/api/orders/place", orderData);
    const response = await axios.post(`${API_URL}/orders/place`, orderData, { headers: { token } });
    if (response.data.success) {
      // 1. Extract the session_url sent by your orderController.js
      const { session_url } = response.data;
      
      // 2. Redirect the user away from your site to Stripe's secure page
      window.location.replace(session_url); 
    } else {
      toast.error("Error: " + response.data.message);
    }
  } catch (error) {
    toast.error("Error connecting to payment server");
  }
};
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="Empty Cart" className="w-40 h-40 opacity-20" />
        <h2 className="text-2xl font-bold text-gray-400">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Wrap everything in a form */}
      <form onSubmit={placeOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-3xl font-bold text-gray-800">Delivery Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First name" className="border p-3 rounded-lg outline-none focus:border-orange-500" />
            <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last name" className="border p-3 rounded-lg outline-none focus:border-orange-500" />
            <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Email address" className="col-span-2 border p-3 rounded-lg outline-none focus:border-orange-500" />
            <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" className="col-span-2 border p-3 rounded-lg outline-none focus:border-orange-500" />
            <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder="City" className="border p-3 rounded-lg outline-none focus:border-orange-500" />
            <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder="State" className="border p-3 rounded-lg outline-none focus:border-orange-500" />
            <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip code" className="border p-3 rounded-lg outline-none focus:border-orange-500" />
            <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" className="border p-3 rounded-lg outline-none focus:border-orange-500" />
            <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone" className="col-span-2 border p-3 rounded-lg outline-none focus:border-orange-500" />
          </div>
        </div>

        {/* Cart Totals Sidebar with Promo Section */}
<div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100 h-fit sticky top-24">
    <h2 className="text-2xl font-black text-slate-900 mb-8">Cart Totals</h2>
    
    <div className="space-y-4 mb-8">
        <div className="flex justify-between text-slate-500 font-bold">
            <span>Subtotal</span>
            <span>${subtotal}</span>
        </div>
        <div className="flex justify-between text-slate-500 font-bold pb-4 border-b border-slate-100">
            <span>Delivery Fee</span>
            <span>$5</span>
        </div>
    </div>

    {/* NEW: Promo Code Section */}
    <div className="mb-8">
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Promo Code</p>
        <div className="flex bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 focus-within:border-orange-500 transition-colors">
            <input 
                type="text" 
                placeholder="Enter code here" 
                className="bg-transparent px-4 py-3 w-full text-sm font-bold text-slate-800 outline-none"
            />
            <button className="bg-slate-900 text-white px-6 text-xs font-black uppercase hover:bg-orange-600 transition-colors">
                Apply
            </button>
        </div>
    </div>

    <div className="flex justify-between items-center mb-10">
        <span className="text-2xl font-black text-slate-900">Total</span>
        <span className="text-2xl font-black text-slate-900">${total}</span>
    </div>

    <button className="w-full bg-orange-600 text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-orange-700 shadow-xl shadow-orange-200 transition-all hover:-translate-y-1">
        Proceed to Payment
    </button>
</div>
      </form>
      
      {/* Review Section remains below */}
      <div className="mt-16 space-y-6">
         <h3 className="text-xl font-bold text-gray-800">Review Your Items</h3>
         {cartItems.map((item) => (
           <div key={item._id} className="flex items-center justify-between bg-white border-b pb-4">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div><h4 className="font-bold">{item.name}</h4><p className="text-orange-600 font-bold">${item.price}</p></div>
              </div>
              <div className="flex items-center gap-4 bg-gray-100 p-2 rounded-full">
                <button onClick={() => removeFromCart(item._id)} className="p-1 hover:text-red-500"><Minus size={18} /></button>
                <span className="font-bold w-6 text-center">{item.quantity}</span>
                <button onClick={() => addToCart(item)} className="p-1 hover:text-green-500"><Plus size={18} /></button>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default Cart;