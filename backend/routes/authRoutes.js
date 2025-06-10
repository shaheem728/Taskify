const express = require('express')
const upload = require('../middlewares/uploadMiddleware')
const router = express.Router();
const {registerUser, loginUser,getUserProfile, updateUserProfile } = require("../controllers/authController")
const { protect } = require("../middlewares/authMiddleware")
// Auth Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile',protect, getUserProfile); //Get user Profile
router.put('/profile',protect , updateUserProfile); //Update Profile

router.post("/upload-image", upload.single("image"),(req,res)=>{
    if(!req.file){
        return res.status(400).json({message:"No file uploaded"})
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({imageUrl})
})

module.exports = router;