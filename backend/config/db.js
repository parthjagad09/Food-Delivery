const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     console.log("Attempting to connect with URI:", process.env.MONGO_URI);
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error("❌ MONGODB ERROR DETAILS:");
//     console.error("Error Message:", error.message);
//     console.error("Error Code:", error.code);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;