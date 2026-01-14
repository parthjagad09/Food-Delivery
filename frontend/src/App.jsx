import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Register from "./pages/Register"
import RestaurantDetails from "./pages/RestaurantDetails"
import Navbar from "./components/Navbar"
import { Toaster } from 'react-hot-toast'
import MyOrders from "./pages/MyOrders"
import AIAssistant from './components/AIAssistant';
import OrderTracker from'./pages/OrderTracker';
import AdminOrders from "./pages/AdminOrders";
import Verify from "./pages/Verify";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/ordertracker/:orderId" element={<OrderTracker />} />
        <Route 
        path='/admin' 
        element={
          <ProtectedRoute>
            <AdminOrders />
          </ProtectedRoute>
        } 
      />
        <Route path='/verify' element={<Verify />} />
        <Route path='/admin-login' element={<AdminLogin />} />
      </Routes>
      <AIAssistant />
    </BrowserRouter>
  )
}

export default App
