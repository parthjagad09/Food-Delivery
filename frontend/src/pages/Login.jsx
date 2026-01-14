

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, ArrowRight } from "lucide-react";
import toast from 'react-hot-toast';
export default function Login() {
  // 1. Logic: State to capture user input
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // 2. Logic: Handle Form Submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Connects to your backend port 5000
  //     const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      
  //     // Store token for session management
  //     localStorage.setItem("token", res.data.token);
  //     localStorage.setItem("user", JSON.stringify(res.data.user));
      
  //     alert("Welcome Back!");
  //     navigate("/"); // Redirect to Home page after login
  //   } catch (err) {
  //     alert(err.response?.data?.message || "Login Failed. Check your credentials.");
  //   }
  // };


const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Loading state toast
  const loadingToast = toast.loading('Verifying credentials...');

  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", formData);
    
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    // Success Toast with Green Bar
    toast.success('Login Successful! Redirecting...', {
      id: loadingToast,
      duration: 4000,
      style: {
        borderBottom: '4px solid #10b981', // Green Line
        padding: '16px',
        color: '#1f2937',
        fontWeight: 'bold'
      },
    });

    setTimeout(() => navigate("/"), 2000);

  } catch (err) {
    // Error Toast with Red Bar
    toast.error(err.response?.data?.message || 'Invalid Credentials', {
      id: loadingToast,
      duration: 4000,
      style: {
        borderBottom: '4px solid #ef4444', // Red Line
        padding: '16px',
        color: '#1f2937',
        fontWeight: 'bold'
      },
    });
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Image/Brand Section (UI EXACTLY AS REQUESTED) */}
        <div className="md:w-1/2 bg-orange-600 p-12 text-white flex flex-col justify-center items-center text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">Welcome Back!</h2>
          <p className="text-orange-100 mb-8">Login to discover the best food deals in your area.</p>
          <img 
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" 
            alt="Pizza" 
            className="w-64 h-64 object-cover rounded-full border-4 border-orange-400 shadow-2xl"
          />
        </div>

        {/* Right Side: Form Section */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Login</h2>
            <p className="text-gray-500 mt-2">Enter your credentials to access your account</p>
          </div>

          {/* 3. Logic: Attached handleSubmit to the form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                required
                placeholder="Email Address"
                // 4. Logic: Capture typing for Email
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border-b-2 border-gray-200 focus:border-orange-500 p-2 pl-12 outline-none transition-colors"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                required
                placeholder="Password"
                // 5. Logic: Capture typing for Password
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full border-b-2 border-gray-200 focus:border-orange-500 p-2 pl-12 outline-none transition-colors"
              />
            </div>

            <button 
              type="submit" // 6. Logic: Must be type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition shadow-lg flex items-center justify-center gap-2 group"
            >
              Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="text-sm text-center mt-8 text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-orange-600 font-bold hover:underline">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}