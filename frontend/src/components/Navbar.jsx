// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ShoppingCart, Menu, X } from 'lucide-react';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-cyan-900 shadow-lg sticky top-0 z-50 transition-all duration-300">
//       <div className="max-w-[1440px] mx-auto px-4 xs:px-6 sm:px-8 md:px-10 lg:px-12">
//         <div className="flex justify-between items-center h-16 md:h-20">
          
//           {/* Logo - responsive font size */}
//           <Link to="/" className="flex items-center">
//             <h1 className="text-2xl xs:text-3xl font-extrabold text-white tracking-tight">
//               FoodDel
//             </h1>
//           </Link>

//           {/* Desktop Menu - Hidden on xs/sm, visible from md up */}
//           <div className="hidden md:flex gap-6 lg:gap-10 items-center text-white font-medium">
//             <Link to="/" className="hover:text-orange-400 transition-colors">Home</Link>
//             <Link to="/cart" className="relative hover:text-orange-400 transition-colors">
//               <ShoppingCart size={24} />
//               <span className="absolute -top-2 -right-2 bg-orange-600 text-[10px] rounded-full h-4 w-4 flex items-center justify-center">0</span>
//             </Link>
//             <Link 
//               to="/login" 
//               className="bg-orange-600 px-6 py-2 rounded-full hover:bg-orange-700 transition-all shadow-md active:scale-95"
//             >
//               Login
//             </Link>
//           </div>

//           {/* Mobile Icons Group (Cart + Hamburger) - Visible on xs, sm, md */}
//           <div className="flex md:hidden items-center gap-4">
//             <Link to="/cart" className="text-white relative p-2">
//               <ShoppingCart size={22} />
//               <span className="absolute top-0 right-0 bg-orange-600 text-[10px] rounded-full h-4 w-4 flex items-center justify-center">0</span>
//             </Link>
            
//             <button 
//               onClick={() => setIsOpen(!isOpen)} 
//               className="text-white p-2 focus:outline-none"
//             >
//               {isOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Sidebar/Dropdown Menu */}
//       <div className={`
//         md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-cyan-950
//         ${isOpen ? 'max-h-64 border-t border-cyan-800' : 'max-h-0'}
//       `}>
//         <div className="flex flex-col gap-4 px-6 py-6 text-white text-center">
//           <Link to="/" onClick={() => setIsOpen(false)} className="py-2 hover:bg-cyan-800 rounded">Home</Link>
//           <Link to="/login" onClick={() => setIsOpen(false)} className="py-2 bg-orange-600 rounded-lg font-bold">Login</Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { ShoppingCart, User, LogOut, Menu, X, ChevronDown } from 'lucide-react';
// import toast from 'react-hot-toast';

// const Navbar = () => {
//   const [user, setUser] = useState(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
  
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Logic: Sync user state whenever the route changes (e.g., after Login redirect)
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       setUser(null);
//     }
//   }, [location]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     setIsProfileOpen(false);
//     toast.success("Logged out successfully", {
//       style: { borderBottom: '4px solid #10b981' } // Green line as requested
//     });
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-cyan-900 shadow-lg sticky top-0 z-50 text-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16 md:h-20">
          
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2">
//             <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">FoodDel</h1>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             <Link to="/" className="hover:text-orange-400 font-medium transition">Home</Link>
            
//             <Link to="/cart" className="relative p-2 hover:bg-cyan-800 rounded-full transition">
//               <ShoppingCart size={24} />
//               <span className="absolute top-0 right-0 bg-orange-600 text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">0</span>
//             </Link>

//             {/* Profile Logic */}
//             {user ? (
//               <div className="relative">
//                 <button 
//                   onClick={() => setIsProfileOpen(!isProfileOpen)}
//                   className="flex items-center gap-2 bg-cyan-800 border border-cyan-700 px-4 py-2 rounded-full hover:bg-cyan-700 transition"
//                 >
//                   <div className="bg-orange-600 p-1 rounded-full"><User size={16} /></div>
//                   <span className="text-sm font-semibold">{user.name.split(' ')[0]}</span>
//                   <ChevronDown size={14} className={isProfileOpen ? 'rotate-180' : ''} />
//                 </button>

//                 {isProfileOpen && (
//                   <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-2xl py-2 text-gray-800 animate-in fade-in zoom-in duration-200">
//                     <div className="px-4 py-2 border-b border-gray-100">
//                       <p className="text-xs text-gray-400 font-semibold">WELCOME</p>
//                       <p className="text-sm font-bold truncate">{user.name}</p>
//                     </div>
//                     <button 
//                       onClick={handleLogout}
//                       className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
//                     >
//                       <LogOut size={16} /> Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link to="/login" className="bg-orange-600 px-8 py-2.5 rounded-full font-bold hover:bg-orange-700 transition shadow-lg">
//                 Login
//               </Link>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center gap-4">
//             <Link to="/cart" className="relative p-2"><ShoppingCart size={22} /></Link>
//             <button onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Dropdown */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-cyan-950 border-t border-cyan-800 px-6 py-6 space-y-4">
//           <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2">Home</Link>
//           {user ? (
//             <button onClick={handleLogout} className="w-full text-left py-2 text-red-400">Logout ({user.name})</button>
//           ) : (
//             <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block py-3 bg-orange-600 text-center rounded-lg font-bold">Login</Link>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { ShoppingCart, User, LogOut, Menu, X, ChevronDown } from 'lucide-react';
// import { useCart } from '../context/CartContext'; //
// import toast from 'react-hot-toast';

// const Navbar = () => {
//   const [user, setUser] = useState(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
  
//   const { cartCount } = useCart(); //
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       setUser(null);
//     }
//   }, [location]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     setIsProfileOpen(false);
//     toast.success("Logged out successfully", {
//       style: { borderBottom: '4px solid #10b981' }
//     });
//     navigate("/login");
//   };

//   return (

// export default Navbar;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// Added Package icon for the orders link
import { ShoppingCart, User, LogOut, Menu, X, ChevronDown, Package } from 'lucide-react';
import { useCart } from '../context/CartContext'; 
import toast from 'react-hot-toast';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const { cartCount } = useCart(); 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsProfileOpen(false);
    toast.success("Logged out successfully", {
      style: { borderBottom: '4px solid #10b981' }
    });
    navigate("/login");
  };

  return (
    <nav className="bg-cyan-900 shadow-lg sticky top-0 z-50 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">FoodDel</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-orange-400 font-medium transition">Home</Link>
            
            {/* Dynamic Cart Badge */}
            <Link to="/cart" className="relative p-2 hover:bg-cyan-800 rounded-full transition">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-orange-600 text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile Logic */}
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 bg-cyan-800 border border-cyan-700 px-4 py-2 rounded-full hover:bg-cyan-700 transition"
                >
                  <div className="bg-orange-600 p-1 rounded-full"><User size={16} /></div>
                  <span className="text-sm font-semibold">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={14} className={isProfileOpen ? 'rotate-180' : ''} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-2xl py-2 text-gray-800 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-400 font-semibold">WELCOME</p>
                      <p className="text-sm font-bold truncate">{user.name}</p>
                    </div>

                    {/* NEW: Link to My Orders Page */}
                    <Link 
                      to="/myorders" 
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition border-b border-gray-100"
                    >
                      <Package size={16} className="text-orange-600" /> My Orders
                    </Link>

                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-orange-600 px-8 py-2.5 rounded-full font-bold hover:bg-orange-700 transition shadow-lg">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-orange-600 text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-cyan-950 border-t border-cyan-800 px-6 py-6 space-y-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2">Home</Link>
          
          {user ? (
            <>
              {/* Mobile My Orders Link */}
              <Link 
                to="/myorders" 
                onClick={() => setIsMenuOpen(false)} 
                className="flex items-center gap-3 py-2 text-gray-200"
              >
                <Package size={18} className="text-orange-500" /> My Orders
              </Link>
              <button onClick={handleLogout} className="w-full text-left py-2 text-red-400">Logout ({user.name})</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block py-3 bg-orange-600 text-center rounded-lg font-bold">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;