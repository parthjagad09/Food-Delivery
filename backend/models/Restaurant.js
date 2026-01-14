// const mongoose = require('mongoose');

// const RestaurantSchema = new mongoose.Schema({
//   name: String,
//   image: String,
//   rating: Number,
//   cuisines: [String],
//   menu: [
//     {
//       name: String,
//       price: Number,
//       isVeg: Boolean
//     }
//   ]
// });

// module.exports = mongoose.model('Restaurant', RestaurantSchema);
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // URL to the image
  cuisine: [String], // e.g., ["Italian", "Pizza"]
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  deliveryTime: { type: String, required: true }, // e.g., "30-40 min"
  description: { type: String, default: "Food provides essential nutrients for overall health." },
  menu: [
    {
      name: String,
      price: Number,
      description: String,
      image: String,
      category: String // e.g., "Starters", "Main Course"
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);