// import React, { useState, useEffect } from 'react';
// import { Search, MapPin } from 'lucide-react';
// import axios from 'axios';
// import RestaurantCard from '../components/RestaurantCard';
// import { API_URL } from '../api';
// const Home = () => {
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [dishes, setDishes] = useState([]);

//   // Detailed categories with icons matching your reference
//   const categories = [
//     { name: 'All', icon: '🍽️' },
//     { name: 'Pizza', icon: '🍕' },
//     { name: 'Burgers', icon: '🍔' },
//     { name: 'Noodles', icon: '🍜' },
//     { name: 'Tacos', icon: '🌮' },
//     { name: 'Sushi', icon: '🍣' },
//     { name: 'Italian', icon: '🍝' }
//   ];

//   useEffect(() => {
//     const fetchDishes = async () => {
//       try {
//         const url = activeCategory === 'All' 
//           ? 'http://localhost:5000/api/restaurants' 
//           : `http://localhost:5000/api/restaurants?category=${activeCategory}`;
//         const res = await axios.get(url);
//         setDishes(res.data);
//       } catch (err) {
//         console.error("Error fetching dishes:", err);
//       }
//     };
//     fetchDishes();
//   }, [activeCategory]);
//   // Inside your Home component
// const [searchQuery, setSearchQuery] = useState('');

// const fetchDishes = async () => {
//   try {
//     // Combine both category and search filters in the URL
//     let url = `http://localhost:5000/api/restaurants?search=${searchQuery}`;
//     if (activeCategory !== 'All') {
//       url += `&category=${activeCategory}`;
//     }
    
//     const res = await axios.get(url);
//     setDishes(res.data);
//   } catch (err) {
//     console.error("Error fetching dishes:", err);
//   }
// };

// // Trigger fetch when category changes OR when search button is clicked
// useEffect(() => {
//   fetchDishes();
// }, [activeCategory]);

// const handleSearch = (e) => {
//   e.preventDefault();
//   fetchDishes();
// };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <section className="bg-white py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between">
//         <div className="md:w-1/2 space-y-6">
//           <h1 className="text-5xl font-extrabold leading-tight">
//             CRAVE & CONQUER. <br /> 
//             <span className="text-orange-600">Your Culinary Journey Starts Here</span>
//           </h1>
//           <div className="flex flex-col md:flex-row items-center bg-white border shadow-lg rounded-xl p-2 w-full max-w-2xl">
//             <div className="flex items-center px-3 border-r">
//               <MapPin className="text-orange-600" size={20} />
//               <input type="text" placeholder="Mumbai, India" className="p-2 outline-none w-32" />
//             </div>
//             <div className="flex items-center px-3 w-full">
//               <Search className="text-gray-400" size={20} />
//               <input type="text" placeholder="Search for restaurants, dishes..." className="p-2 outline-none w-full" />
//             </div>
//             <button className="bg-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition">Search</button>
//           </div>
//         </div>
//         <div className="md:w-1/2 mt-10 md:mt-0 text-right">
//           <img src="https://img.freepik.com/free-vector/delivery-service-with-mask-concept_23-2148505104.jpg" alt="Delivery" className="w-full max-w-md ml-auto" />
//         </div>
//       </section>

//       {/* Categories Section */}
//       <section className="px-6 md:px-20 py-10">
//         <h2 className="text-2xl font-bold mb-8">Popular Cuisines</h2>
//         <div className="flex gap-10 overflow-x-auto pb-4 no-scrollbar">
//           {categories.map((cat) => (
//             <div 
//               key={cat.name} 
//               onClick={() => setActiveCategory(cat.name)}
//               className="shrink-0 text-center cursor-pointer group"
//             >
//               <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-2 transition-all border-2 
//                 ${activeCategory === cat.name ? 'border-orange-500 p-1' : 'border-transparent shadow-md'}`}>
//                 <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-4xl shadow-sm">
//                   {cat.icon}
//                 </div>
//               </div>
//               <p className={`font-medium ${activeCategory === cat.name ? 'text-orange-600' : 'text-gray-600'}`}>
//                 {cat.name}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Top Dishes Grid */}
//       <section className="px-6 md:px-20 py-12">
//         <h2 className="text-3xl font-bold mb-10 text-gray-800">Top {activeCategory} dishes near you</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {dishes.map((item) => (
//             <RestaurantCard key={item._id} dish={item} />
//           ))}
//         </div>
//         {dishes.length === 0 && (
//           <p className="text-center text-gray-400 mt-10 text-lg">No dishes found in this category.</p>
//         )}
//       </section>
//     </div>
//   );
// };

// export default Home;
import React, { useState, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [dishes, setDishes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // REPLACE with your actual Vercel link
  const API_BASE_URL = "https://food-delivery-two-lac.vercel.app/api/restaurants";

  const categories = [
    { name: 'All', icon: '🍽️' },
    { name: 'Pizza', icon: '🍕' },
    { name: 'Burgers', icon: '🍔' },
    { name: 'Noodles', icon: '🍜' },
    { name: 'Tacos', icon: '🌮' },
    { name: 'Sushi', icon: '🍣' },
    { name: 'Italian', icon: '🍝' }
  ];

  const fetchDishes = async () => {
    try {
      // Use the live Vercel URL with query parameters
      let url = `${API_BASE_URL}?search=${searchQuery}`;
      if (activeCategory !== 'All') {
        url += `&category=${activeCategory}`;
      }
      
      const res = await axios.get(url);
      setDishes(res.data);
    } catch (err) {
      console.error("Error fetching dishes:", err);
    }
  };

  // Fetch when category changes
  useEffect(() => {
    fetchDishes();
  }, [activeCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDishes();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-16 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            CRAVE & CONQUER. <br /> 
            <span className="text-orange-600">Your Culinary Journey Starts Here</span>
          </h1>
          
          {/* Linked Search Form */}
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center bg-white border shadow-lg rounded-xl p-2 w-full max-w-2xl">
            <div className="flex items-center px-3 border-r hidden md:flex">
              <MapPin className="text-orange-600" size={20} />
              <input type="text" placeholder="Mumbai, India" className="p-2 outline-none w-32" disabled />
            </div>
            <div className="flex items-center px-3 w-full">
              <Search className="text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search for restaurants, dishes..." 
                className="p-2 outline-none w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Connects input to state
              />
            </div>
            <button type="submit" className="bg-orange-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition w-full md:w-auto">
              Search
            </button>
          </form>
        </div>
        
        {/* Responsive Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 text-right hidden md:block">
          <img src="https://img.freepik.com/free-vector/delivery-service-with-mask-concept_23-2148505104.jpg" alt="Delivery" className="w-full max-w-md ml-auto" />
        </div>
      </section>

      {/* Categories Section - Responsive */}
      <section className="px-6 md:px-20 py-10 overflow-hidden">
        <h2 className="text-xl md:text-2xl font-bold mb-8">Popular Cuisines</h2>
        <div className="flex gap-4 md:gap-10 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => (
            <div 
              key={cat.name} 
              onClick={() => setActiveCategory(cat.name)}
              className="shrink-0 text-center cursor-pointer group"
            >
              <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-2 transition-all border-2 
                ${activeCategory === cat.name ? 'border-orange-500 p-1' : 'border-transparent shadow-md'}`}>
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-2xl md:text-4xl shadow-sm">
                  {cat.icon}
                </div>
              </div>
              <p className={`text-xs md:font-medium ${activeCategory === cat.name ? 'text-orange-600' : 'text-gray-600'}`}>
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Dishes Grid */}
      <section className="px-6 md:px-20 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gray-800">Top {activeCategory} dishes near you</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {dishes.map((item) => (
            <RestaurantCard key={item._id} dish={item} />
          ))}
        </div>
        {dishes.length === 0 && (
          <p className="text-center text-gray-400 mt-10 text-lg">No dishes found. Try searching for "Tiramisu"!</p>
        )}
      </section>
    </div>
  );
};

export default Home;