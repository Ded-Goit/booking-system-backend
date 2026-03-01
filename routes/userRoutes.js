const express = require("express");
const router = express.Router();
const { getBusinessUsers } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

//  GET /api/users/businesses
router.get("/businesses", protect, getBusinessUsers);

module.exports = router;
