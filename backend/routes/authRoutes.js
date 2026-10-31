const express = require('express')
const upload = require('../middlewares/uploadMiddleware')
const router = express.Router();
const { registerUser, loginUser, registerMember, verifyEmail, verifyResetOtp, resetPassword, getUserProfile, updateUserProfile } = require("../controllers/authController")
const { protect, adminOnly } = require("../middlewares/authMiddleware")
// Auth Routes
router.post('/register', registerUser);
router.post('/register-member', adminOnly, registerMember);
router.post('/login', loginUser);
router.post('/verify-email', verifyEmail);
router.post('/verify-reset-otp', verifyResetOtp);
router.post('/reset-password', resetPassword);
router.get('/profile', protect, getUserProfile); //Get user Profile
router.patch('/profile', protect, updateUserProfile); //Update Profile

router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" })
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl })
})

module.exports = router;