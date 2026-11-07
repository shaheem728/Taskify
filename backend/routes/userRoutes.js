const express = require("express")
const { adminOnly, protect } = require("../middlewares/authMiddleware")
const { createUser, deleteUser, getUser, getUserById } = require("../controllers/userController")
const router = express.Router()

//User Manaement Routes
router.get("/", protect, adminOnly, getUser) //Get all users (Admin only)
router.post('/create', protect, adminOnly, createUser);
router.get("/:id", protect, getUserById) //Get a specific user
router.delete("/:id", protect, adminOnly, deleteUser); //Delete a specific user

module.exports = router