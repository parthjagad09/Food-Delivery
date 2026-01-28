import { Star, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext'; // Import the hook
import { API_URL } from '../api';
const RestaurantCard = ({ dish }) => {
  const { addToCart } = useCart(); // Access the function
  const getImageUrl = (imagePath) => {
  if (imagePath.startsWith('http')) {
    return imagePath; // Return the Unsplash link exactly as it is
  }
  const BASE_URL = API_URL.replace('/api', ''); 
  return `${BASE_URL}${imagePath}`; // Only add the Backend URL for local uploads
};
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