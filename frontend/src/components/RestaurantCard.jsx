// import { Star } from "lucide-react"
// import { Link } from "react-router-dom"

// export default function RestaurantCard({ data }) {
//   return (
//     <Link to={`/restaurant/${data.id}`}>
//       <div className="border rounded-lg p-4 hover:shadow-lg">
//         <img
//           src="https://source.unsplash.com/400x300/?food"
//           className="rounded"
//         />
//         <h2 className="mt-3 font-semibold">{data.name}</h2>
//         <div className="flex items-center gap-2 text-sm">
//           <Star size={16} className="text-yellow-500" />
//           {data.rating} • {data.time}
//         </div>
//       </div>
//     </Link>
//   )
// }


// import { Star } from 'lucide-react';

// const RestaurantCard = ({ restaurant }) => {
//   return (
//     <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer border border-gray-100 group">
//       <div className="relative h-48 overflow-hidden">
//         <img 
//           src={restaurant.image || "https://images.unsplash.com/photo-1513104890138-7c749659a591"} 
//           alt={restaurant.name} 
//           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//         />
//         <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
//           Free Delivery
//         </div>
//       </div>
      
//       <div className="p-4">
//         <div className="flex justify-between items-start mb-1">
//           <h3 className="text-lg font-bold text-gray-800">{restaurant.name}</h3>
//           <div className="flex items-center bg-green-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">
//             {restaurant.rating || '4.2'} <Star size={10} className="ml-1 fill-current" />
//           </div>
//         </div>
        
//         <p className="text-sm text-gray-500 mb-3">{restaurant.cuisine?.join(', ')}</p>
        
//         <div className="flex items-center justify-between border-t pt-3 mt-auto">
//           <span className="text-gray-600 font-medium text-sm">{restaurant.deliveryTime || '30-40 min'}</span>
//           <span className="text-orange-600 font-bold">View Menu</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RestaurantCard;

// import React from 'react';
// import { Plus, Star } from 'lucide-react';

// const RestaurantCard = ({ restaurant }) => {
//   return (
//     <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
//       <div className="relative h-48 w-full">
//         <img 
//           src={restaurant.image} 
//           alt={restaurant.name} 
//           className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
//         />
//         <button className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-lg text-orange-600 hover:bg-orange-600 hover:text-white transition-colors">
//           <Plus size={20} />
//         </button>
//       </div>

//       <div className="mt-4 space-y-2 text-left">
//         <div className="flex justify-between items-center">
//           <h3 className="font-bold text-lg text-gray-800">{restaurant.name}</h3>
//           <div className="flex text-orange-500">
//             {[...Array(5)].map((_, i) => (
//               <Star key={i} size={14} className={i < restaurant.rating ? "fill-current" : "text-gray-200"} />
//             ))}
//           </div>
//         </div>
        
//         <p className="text-gray-500 text-xs leading-relaxed truncate">
//           {restaurant.description || "Food provides essential nutrients for overall health."}
//         </p>
        
//         <div className="text-2xl font-bold text-orange-600 pt-1">
//           ${restaurant.price}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RestaurantCard;

// import { Star, Plus } from 'lucide-react';

// const RestaurantCard = ({ dish }) => {
//   return (
//     <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
//       <div className="relative">
//         <img src={dish.image} alt={dish.name} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
//         <button className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg text-orange-600 hover:bg-orange-600 hover:text-white transition-colors">
//           <Plus size={24} strokeWidth={3} />
//         </button>
//       </div>
//       <div className="p-6 space-y-3">
//         <div className="flex justify-between items-center">
//           <h3 className="text-xl font-bold text-gray-800">{dish.name}</h3>
//           <div className="flex gap-1">
//             {[...Array(5)].map((_, i) => (
//               <Star key={i} size={14} className={i < (dish.rating || 4) ? "fill-orange-500 text-orange-500" : "text-gray-200"} />
//             ))}
//           </div>
//         </div>
//         <p className="text-gray-500 text-sm leading-relaxed">
//           {dish.description || "Freshly prepared with essential nutrients for overall health and well-being."}
//         </p>
//         <div className="text-2xl font-bold text-orange-600 mt-2">
//           ${dish.price || 12}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RestaurantCard;

// src/components/RestaurantCard.jsx
import { Star, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext'; // Import the hook

const RestaurantCard = ({ dish }) => {
  const { addToCart } = useCart(); // Access the function

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
      <div className="relative">
        <img src={dish.image} alt={dish.name} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
        
        {/* CLICK HANDLER ADDED HERE */}
        <button 
          onClick={() => addToCart(dish)} 
          className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg text-orange-600 hover:bg-orange-600 hover:text-white transition-colors"
        >
          <Plus size={24} strokeWidth={3} />
        </button>
      </div>
      {/* ... details section remains the same ... */}
      <div className="p-6 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">{dish.name}</h3>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className={i < (dish.rating || 4) ? "fill-orange-500 text-orange-500" : "text-gray-200"} />
            ))}
          </div>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed">
          {dish.description || "Freshly prepared with essential nutrients for overall health and well-being."}
        </p>
        <div className="text-2xl font-bold text-orange-600 mt-2">
          ${dish.price || 12}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;