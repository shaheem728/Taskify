const express = require("express")
const{adminOnly, protect} = require("../middlewares/authMiddleware")
const{getUser,getUserById} = require("../controllers/userController")
const router = express.Router()

//User Manaement Routes
router.get("/",protect,adminOnly, getUser) //Get all users (Admin only)
router.get("/:id",protect,getUserById) //Get a specific user

module.exports = router