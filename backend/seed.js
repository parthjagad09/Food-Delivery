// require('dotenv').config();
// const mongoose = require('mongoose');
// const Restaurant = require('./models/Restaurant');

// mongoose.connect(process.env.MONGO_URI)
//   .then(async () => {
//     console.log('MongoDB connected');

//     await Restaurant.deleteMany();

//     await Restaurant.insertMany([
//      {
//     name: 'Pizza Palace',
//     image: 'https://images.unsplash.com/photo-1601924638867-3ec62f69b8c7',
//     rating: 4.5,
//     cuisine: ['Pizza', 'Italian'], // Matches singular 'cuisine' in your model
//     price: 199,                   // Required by your model
//     deliveryTime: '30-40 min',    // FIX: Required to stop the validation error
//     description: 'Freshly prepared with essential nutrients for overall health.'
//   }

//     ]);

//     console.log('Data Seeded');
//     process.exit();
//   })
//   .catch(err => console.error(err));
// require('dotenv').config();
// const mongoose = require('mongoose');
// const Restaurant = require('./models/Restaurant');

// mongoose.connect(process.env.MONGO_URI)
//   .then(async () => {
//     console.log('MongoDB connected');
//     await Restaurant.deleteMany();

//     const dishes = [
//       // Pizza Category
//       { name: 'Margherita Pizza', image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca', cuisine: ['Pizza', 'All'], price: 12, rating: 5, deliveryTime: '20-30 min' },
//       { name: 'Pepperoni Feast', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e', cuisine: ['Pizza', 'All'], price: 15, rating: 4, deliveryTime: '25-35 min' },
//       { name: 'Veggie Supreme', image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47', cuisine: ['Pizza', 'All'], price: 14, rating: 5, deliveryTime: '20-30 min' },
      
//       // Burgers Category
//       { name: 'Classic Beef Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd', cuisine: ['Burgers', 'All'], price: 10, rating: 4, deliveryTime: '15-25 min' },
//       { name: 'Cheese Explosion', image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9', cuisine: ['Burgers', 'All'], price: 13, rating: 5, deliveryTime: '20-30 min' },
//       { name: 'Crispy Chicken Burger', image: 'https://images.unsplash.com/photo-1514361892635-6b07e31e75f9', cuisine: ['Burgers', 'All'], price: 12, rating: 4, deliveryTime: '15-25 min' },

//       // Noodles Category
//       { name: 'Hakka Noodles', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246', cuisine: ['Noodles', 'All'], price: 11, rating: 4, deliveryTime: '20-30 min' },
//       { name: 'Spicy Ramen', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624', cuisine: ['Noodles', 'All'], price: 16, rating: 5, deliveryTime: '25-35 min' },
//       { name: 'Pad Thai', image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3', cuisine: ['Noodles', 'All'], price: 14, rating: 4, deliveryTime: '20-30 min' },

//       // Sushi Category
//       { name: 'Salmon Nigiri', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c', cuisine: ['Sushi', 'All'], price: 18, rating: 5, deliveryTime: '30-40 min' },
//       { name: 'California Roll', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754', cuisine: ['Sushi', 'All'], price: 15, rating: 4, deliveryTime: '25-35 min' },
//       { name: 'Dragon Roll', image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252', cuisine: ['Sushi', 'All'], price: 20, rating: 5, deliveryTime: '30-45 min' },

//       // Italian Category
//       { name: 'Pasta Carbonara', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3', cuisine: ['Italian', 'All'], price: 16, rating: 5, deliveryTime: '25-35 min' },
//       { name: 'Lasagna Bolognese', image: 'https://images.unsplash.com/photo-1619895092538-128341789043', cuisine: ['Italian', 'All'], price: 18, rating: 4, deliveryTime: '30-40 min' },
//       { name: 'Pesto Penne', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856', cuisine: ['Italian', 'All'], price: 14, rating: 5, deliveryTime: '20-30 min' }
//     ];

//     await Restaurant.insertMany(dishes);
//     console.log('✅ Data Seeded Successfully with varied Cuisines!');
//     process.exit();
//   })
//   .catch(err => console.error('❌ Seeding Error:', err));

require('dotenv').config();
const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    await Restaurant.deleteMany();

    const dishes = [
      // PIZZA (8 Items)
      { name: 'Margherita Pizza', image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca', cuisine: ['Pizza', 'All'], price: 12, rating: 5, deliveryTime: '20-30 min' },
      { name: 'Pepperoni Feast', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e', cuisine: ['Pizza', 'All'], price: 15, rating: 4, deliveryTime: '25-35 min' },
      { name: 'Veggie Supreme', image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47', cuisine: ['Pizza', 'All'], price: 14, rating: 5, deliveryTime: '20-30 min' },
      { name: 'BBQ Chicken Pizza', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38', cuisine: ['Pizza', 'All'], price: 16, rating: 4, deliveryTime: '30-40 min' },
      { name: 'Hawaiian Bliss', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', cuisine: ['Pizza', 'All'], price: 13, rating: 3, deliveryTime: '25-30 min' },
      { name: 'Four Cheese', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591', cuisine: ['Pizza', 'All'], price: 17, rating: 5, deliveryTime: '20-25 min' },
      { name: 'Tandoori Paneer Pizza', image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e', cuisine: ['Pizza', 'All'], price: 14, rating: 5, deliveryTime: '30-35 min' },
      { name: 'Meat Lovers', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591', cuisine: ['Pizza', 'All'], price: 18, rating: 4, deliveryTime: '35-45 min' },

      // BURGERS (8 Items)
      { name: 'Classic Beef Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd', cuisine: ['Burgers', 'All'], price: 10, rating: 4, deliveryTime: '15-25 min' },
      { name: 'Cheese Explosion', image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9', cuisine: ['Burgers', 'All'], price: 13, rating: 5, deliveryTime: '20-30 min' },
      { name: 'Crispy Chicken Burger', image: 'https://images.unsplash.com/photo-1514361892635-6b07e31e75f9', cuisine: ['Burgers', 'All'], price: 12, rating: 4, deliveryTime: '15-25 min' },
      { name: 'Veggie Bean Burger', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349', cuisine: ['Burgers', 'All'], price: 9, rating: 3, deliveryTime: '10-20 min' },
      { name: 'Bacon BBQ Burger', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b', cuisine: ['Burgers', 'All'], price: 15, rating: 5, deliveryTime: '25-35 min' },
      { name: 'Mushroom Swiss', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5', cuisine: ['Burgers', 'All'], price: 14, rating: 4, deliveryTime: '20-30 min' },
      { name: 'Double Patty Monster', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd', cuisine: ['Burgers', 'All'], price: 17, rating: 5, deliveryTime: '30-40 min' },
      { name: 'Peri Peri Burger', image: 'https://images.unsplash.com/photo-1499186024912-c374ac2e9cb2', cuisine: ['Burgers', 'All'], price: 12, rating: 4, deliveryTime: '20-25 min' },

      // NOODLES (8 Items)
      { name: 'Hakka Noodles', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246', cuisine: ['Noodles', 'All'], price: 11, rating: 4, deliveryTime: '20-30 min' },
      { name: 'Spicy Ramen', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624', cuisine: ['Noodles', 'All'], price: 16, rating: 5, deliveryTime: '25-35 min' },
      { name: 'Pad Thai', image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3', cuisine: ['Noodles', 'All'], price: 14, rating: 4, deliveryTime: '20-30 min' },
      { name: 'Egg Chow Mein', image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c', cuisine: ['Noodles', 'All'], price: 12, rating: 4, deliveryTime: '15-25 min' },
      { name: 'Butter Noodles', image: 'https://images.unsplash.com/photo-1552611052-33e04de081de', cuisine: ['Noodles', 'All'], price: 10, rating: 5, deliveryTime: '10-20 min' },
      { name: 'Szechuan Noodles', image: 'https://images.unsplash.com/photo-1552611052-33e04de081de', cuisine: ['Noodles', 'All'], price: 13, rating: 4, deliveryTime: '20-30 min' },
      { name: 'Dan Dan Noodles', image: 'https://images.unsplash.com/photo-1612927623705-618d237b77c3', cuisine: ['Noodles', 'All'], price: 15, rating: 5, deliveryTime: '25-35 min' },
      { name: 'Singapore Noodles', image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f', cuisine: ['Noodles', 'All'], price: 14, rating: 4, deliveryTime: '20-25 min' },

      // TACOS (7 Items)
      { name: 'Beef Tacos', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', cuisine: ['Tacos', 'All'], price: 9, rating: 4, deliveryTime: '10-20 min' },
      { name: 'Fish Tacos', image: 'https://images.unsplash.com/photo-1512838243191-e81e8f66f1fd', cuisine: ['Tacos', 'All'], price: 12, rating: 5, deliveryTime: '20-30 min' },
      { name: 'Chicken Al Pastor', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', cuisine: ['Tacos', 'All'], price: 11, rating: 4, deliveryTime: '15-25 min' },
      { name: 'Shrimp Tacos', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', cuisine: ['Tacos', 'All'], price: 14, rating: 5, deliveryTime: '20-30 min' },
      { name: 'Vegan Cauliflower', image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', cuisine: ['Tacos', 'All'], price: 10, rating: 4, deliveryTime: '15-20 min' },
      { name: 'Steak Quesadilla', image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e', cuisine: ['Tacos', 'All'], price: 13, rating: 4, deliveryTime: '20-30 min' },
      { name: 'Chorizo Tacos', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836', cuisine: ['Tacos', 'All'], price: 11, rating: 5, deliveryTime: '15-25 min' },

      // SUSHI (7 Items)
      { name: 'Salmon Nigiri', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c', cuisine: ['Sushi', 'All'], price: 18, rating: 5, deliveryTime: '30-40 min' },
      { name: 'California Roll', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754', cuisine: ['Sushi', 'All'], price: 15, rating: 4, deliveryTime: '25-35 min' },
      { name: 'Dragon Roll', image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252', cuisine: ['Sushi', 'All'], price: 20, rating: 5, deliveryTime: '30-45 min' },
      { name: 'Tuna Sashimi', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754', cuisine: ['Sushi', 'All'], price: 22, rating: 5, deliveryTime: '20-30 min' },
{ name: 'Tempura Roll', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351', cuisine: ['Sushi', 'All'], price: 16, rating: 4, deliveryTime: '25-35 min' },
      { name: 'Spicy Mayo Roll', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351', cuisine: ['Sushi', 'All'], price: 14, rating: 4, deliveryTime: '20-30 min' },
      { name: 'Veggie Maki', image: 'https://images.unsplash.com/photo-1558985250-27a406d64cb3', cuisine: ['Sushi', 'All'], price: 12, rating: 4, deliveryTime: '15-25 min' },

      // ITALIAN (7 Items)
      { name: 'Pasta Carbonara', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3', cuisine: ['Italian', 'All'], price: 16, rating: 5, deliveryTime: '25-35 min' },
      { name: 'Lasagna Bolognese', image: 'https://images.unsplash.com/photo-1619895092538-128341789043', cuisine: ['Italian', 'All'], price: 18, rating: 4, deliveryTime: '30-40 min' },
      { name: 'Pesto Penne', image: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856', cuisine: ['Italian', 'All'], price: 14, rating: 5, deliveryTime: '20-30 min' },
      { name: 'Seafood Fettuccine', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8', cuisine: ['Italian', 'All'], price: 24, rating: 5, deliveryTime: '35-45 min' },
      { name: 'Spinach Ravioli', image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141', cuisine: ['Italian', 'All'], price: 17, rating: 4, deliveryTime: '25-35 min' },
      { name: 'Bruschetta', image: 'https://images.unsplash.com/photo-1572656631137-7935297eff55', cuisine: ['Italian', 'All'], price: 8, rating: 5, deliveryTime: '10-15 min' },
      { name: 'Tiramisu', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9', cuisine: ['Italian', 'All'], price: 10, rating: 5, deliveryTime: '10-15 min' }
    ];

    await Restaurant.insertMany(dishes);
    console.log(`✅ Data Seeded Successfully with ${dishes.length} Items!`);
    process.exit();
  })
  .catch(err => console.error('❌ Seeding Error:', err));