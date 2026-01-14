// const express = require('express');
// const router = express.Router();
// // IMPORTANT: Use the new GenAI library
// const { GoogleGenAI } = require("@google/genai");

// // Access your API Key
// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// router.post('/chat', async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     // Use the latest available model string to avoid 404 errors
//     const response = await ai.models.generateContent({
//       model: "gemini-2.5-flash", 
//       contents: [{
//         role: "user",
//         parts: [{
//           text: `You are the FoodDel Assistant. 
//           Help users with our menu:
//           - Margherita Pizza ($12)
//           - Pepperoni Feast ($15)
//           - Veggie Supreme ($14)
//           - BBQ Chicken ($16)
          
//           User says: ${prompt}`
//         }]
//       }]
//     });

//     res.json({ text: response.text });
//   } catch (err) {
//     console.error("Gemini Final Error Check:", err.message);
//     res.status(500).json({ text: "The AI is currently updating. Please try again in a few seconds!" });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.post('/chat', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: [{
        role: "user",
        parts: [{
          text: `You are the FoodDel AI Assistant. Use ONLY the following complete menu to help customers.
          
          FULL MENU DATA:
          {
            "Pizza": [
              {"name": "Margherita Pizza", "price": 12, "rating": 5, "time": "20-30 min"},
              {"name": "Pepperoni Feast", "price": 15, "rating": 4, "time": "25-35 min"},
              {"name": "Veggie Supreme", "price": 14, "rating": 5, "time": "20-30 min"},
              {"name": "BBQ Chicken Pizza", "price": 16, "rating": 4, "time": "30-40 min"},
              {"name": "Hawaiian Bliss", "price": 13, "rating": 3, "time": "25-30 min"},
              {"name": "Four Cheese", "price": 17, "rating": 5, "time": "20-25 min"},
              {"name": "Tandoori Paneer Pizza", "price": 14, "rating": 5, "time": "30-35 min"},
              {"name": "Meat Lovers", "price": 18, "rating": 4, "time": "35-45 min"}
            ],
            "Burgers": [
              {"name": "Classic Beef Burger", "price": 10, "rating": 4, "time": "15-25 min"},
              {"name": "Cheese Explosion", "price": 13, "rating": 5, "time": "20-30 min"},
              {"name": "Crispy Chicken Burger", "price": 12, "rating": 4, "time": "15-25 min"},
              {"name": "Veggie Bean Burger", "price": 9, "rating": 3, "time": "10-20 min"},
              {"name": "Bacon BBQ Burger", "price": 15, "rating": 5, "time": "25-35 min"},
              {"name": "Mushroom Swiss", "price": 14, "rating": 4, "time": "20-30 min"},
              {"name": "Double Patty Monster", "price": 17, "rating": 5, "time": "30-40 min"},
              {"name": "Peri Peri Burger", "price": 12, "rating": 4, "time": "20-25 min"}
            ],
            "Noodles": [
              {"name": "Hakka Noodles", "price": 11, "rating": 4, "time": "20-30 min"},
              {"name": "Spicy Ramen", "price": 16, "rating": 5, "time": "25-35 min"},
              {"name": "Pad Thai", "price": 14, "rating": 4, "time": "20-30 min"},
              {"name": "Egg Chow Mein", "price": 12, "rating": 4, "time": "15-25 min"},
              {"name": "Butter Noodles", "price": 10, "rating": 5, "time": "10-20 min"},
              {"name": "Szechuan Noodles", "price": 13, "rating": 4, "time": "20-30 min"},
              {"name": "Dan Dan Noodles", "price": 15, "rating": 5, "time": "25-35 min"},
              {"name": "Singapore Noodles", "price": 14, "rating": 4, "time": "20-25 min"}
            ],
            "Tacos": [
              {"name": "Beef Tacos", "price": 9, "rating": 4, "time": "10-20 min"},
              {"name": "Fish Tacos", "price": 12, "rating": 5, "time": "20-30 min"},
              {"name": "Chicken Al Pastor", "price": 11, "rating": 4, "time": "15-25 min"},
              {"name": "Shrimp Tacos", "price": 14, "rating": 5, "time": "20-30 min"},
              {"name": "Vegan Cauliflower", "price": 10, "rating": 4, "time": "15-20 min"},
              {"name": "Steak Quesadilla", "price": 13, "rating": 4, "time": "20-30 min"},
              {"name": "Chorizo Tacos", "price": 11, "rating": 5, "time": "15-25 min"}
            ],
            "Sushi": [
              {"name": "Salmon Nigiri", "price": 18, "rating": 5, "time": "30-40 min"},
              {"name": "California Roll", "price": 15, "rating": 4, "time": "25-35 min"},
              {"name": "Dragon Roll", "price": 20, "rating": 5, "time": "30-45 min"},
              {"name": "Tuna Sashimi", "price": 22, "rating": 5, "time": "20-30 min"},
              {"name": "Tempura Roll", "price": 16, "rating": 4, "time": "25-35 min"},
              {"name": "Spicy Mayo Roll", "price": 14, "rating": 4, "time": "20-30 min"},
              {"name": "Veggie Maki", "price": 12, "rating": 4, "time": "15-25 min"}
            ],
            "Italian": [
              {"name": "Pasta Carbonara", "price": 16, "rating": 5, "time": "25-35 min"},
              {"name": "Lasagna Bolognese", "price": 18, "rating": 4, "time": "30-40 min"},
              {"name": "Pesto Penne", "price": 14, "rating": 5, "time": "20-30 min"},
              {"name": "Seafood Fettuccine", "price": 24, "rating": 5, "time": "35-45 min"},
              {"name": "Spinach Ravioli", "price": 17, "rating": 4, "time": "25-35 min"},
              {"name": "Bruschetta", "price": 8, "rating": 5, "time": "10-15 min"},
              {"name": "Tiramisu", "price": 10, "rating": 5, "time": "10-15 min"}
            ]
          }

          INSTRUCTIONS:
          - If a user asks for a recommendation, prioritize 5-star items.
          - Always mention the price and delivery time.
          - Group answers by category if the user asks for "Burgers" or "Sushi".
          
          User Prompt: ${prompt}`
        }]
      }]
    });

    res.json({ text: response.text });
  } catch (err) {
    console.error("Gemini Error:", err.message);
    res.status(500).json({ text: "I'm having a quick rest. Try again in 5 seconds!" });
  }
});

module.exports = router;