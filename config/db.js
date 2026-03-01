const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("Connecting to MongoDB (Legacy Mode)...");
  try {
    // Чисте підключення без DNS-хаків
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ DB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
