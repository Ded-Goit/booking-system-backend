const User = require("../models/User");

// Отримати всіх бізнес користувачів
const getBusinessUsers = async (req, res) => {
  try {
    const businesses = await User.find({ role: "business" }).select(
      "-password",
    );

    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getBusinessUsers };
