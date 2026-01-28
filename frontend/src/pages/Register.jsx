import { useState } from "react"; // Added state
import { Link, useNavigate } from "react-router-dom"; // Added navigate
import axios from "axios"; // Added axios
import { User, Mail, Lock } from "lucide-react";
import toast from 'react-hot-toast';
import { API_URL } from '../api';
export default function Register() {
  // 1. State to store user input
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // 2. Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Sends data to your backend auth route
  //     const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      
  //     // Store token for session management
  //     localStorage.setItem("token", res.data.token);
      
  //     alert("Registration Successful!");
  //     navigate("/login"); // Redirect to login after successful signup
  //   } catch (err) {
  //     alert(err.response?.data?.message || "Registration Failed. Try again.");
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Start a loading toast so the user knows the request is processing
  const loadingToast = toast.loading('Creating your account...');

  try {
    const res = await axios.post(`${API_URL}/auth/register`, formData);
    
    // Success Toast with Green Bar
    toast.success('Registration Successful!', {
      id: loadingToast, // This replaces the loading message
      duration: 4000,
      style: {
        borderBottom: '4px solid #10b981', // Professional Green Line
        padding: '16px',
        color: '#1f2937',
        fontWeight: 'bold',
        borderRadius: '8px',
      },
    });

    // Short delay before redirecting so they can see the message
    setTimeout(() => {
      navigate("/login");
    }, 2000);

  } catch (err) {
    // Error Toast with Red Bar if registration fails
    toast.error(err.response?.data?.message || 'Registration failed. Please try again.', {
      id: loadingToast,
      duration: 4000,
      style: {
        borderBottom: '4px solid #ef4444', // Red Line for Errors
        padding: '16px',
        color: '#1f2937',
        fontWeight: 'bold',
        borderRadius: '8px',
      },
    });
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse">
        
        {/* Right Side: Image/Brand Section */}
        <div className="md:w-1/2 bg-gray-900 p-12 text-white flex flex-col justify-center items-center text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">Join the Family</h2>
          <p className="text-gray-400 mb-8">Sign up today and get your first delivery free!</p>
          <img 
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591" 
            alt="Burger" 
            className="w-64 h-64 object-cover rounded-2xl border-2 border-gray-700 shadow-2xl rotate-3"
          />
        </div>

        {/* Left Side: Form Section */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="mb-10 text-left">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-500 mt-2 text-sm">Fill in your details to get started.</p>
          </div>

          {/* 3. Added onSubmit to form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <User className="absolute left-0 top-2 text-orange-600" size={18} />
              <input
                type="text"
                placeholder="Full Name"
                required
                // 4. Added onChange to capture Name
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border-b border-gray-300 focus:border-orange-500 p-2 pl-8 outline-none bg-transparent"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-0 top-2 text-orange-600" size={18} />
              <input
                type="email"
                placeholder="Email"
                required
                // 5. Added onChange to capture Email
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border-b border-gray-300 focus:border-orange-500 p-2 pl-8 outline-none bg-transparent"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-0 top-2 text-orange-600" size={18} />
              <input
                type="password"
                placeholder="Password"
                required
                // 6. Added onChange to capture Password
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full border-b border-gray-300 focus:border-orange-500 p-2 pl-8 outline-none bg-transparent"
              />
            </div>

            <button 
              type="submit" // 7. Ensure type is submit
              className="w-full bg-orange-600 text-white py-4 rounded-full font-bold hover:bg-orange-700 transition shadow-xl mt-4"
            >
              Register Now
            </button>
          </form>

          <p className="text-sm text-center mt-8 text-gray-500">
            Already a member?{" "}
            <Link to="/login" className="text-orange-600 font-bold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}