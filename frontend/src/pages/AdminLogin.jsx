import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { API_URL } from '../api';
const AdminLogin = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        setData(data => ({ ...data, [event.target.name]: event.target.value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        try {
            // const response = await axios.post("http://localhost:5000/api/user/admin-login", data);
            const response = await axios.post(`${API_URL}/user/admin-login`, data);
            if (response.data.success) {
                // Store token and admin status
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("isAdmin", "true");
                toast.success("Welcome, Admin");
                navigate("/admin");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Login Failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
            <form onSubmit={onLogin} className="bg-white p-10 rounded-[2rem] shadow-xl border border-slate-100 w-full max-w-md">
                <h2 className="text-3xl font-black text-slate-900 mb-6">Admin <span className="text-orange-500">Portal</span></h2>
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Admin Email" className="w-full p-4 mb-4 border rounded-2xl" required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" className="w-full p-4 mb-6 border rounded-2xl" required />
                <button type='submit' className="w-full bg-slate-900 text-white p-4 rounded-2xl font-bold hover:bg-orange-500 transition-colors">Login to Dashboard</button>
            </form>
        </div>
    );
};

export default AdminLogin;