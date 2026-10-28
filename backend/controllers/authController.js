const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config()
const { sendOtpEmail } = require('../service/email.service')

//Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

//@desc Register a new user
//@route POST /api/auth/register
//@access Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl, adminInviteToken } = req.body;
        //check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Determine User role: Admin if correct token  is  provided, otherwise Member
        let role = 'member';
        if (adminInviteToken && adminInviteToken == process.env.ADMIN_INVITE_TOKEN) {
            role = 'admin'
        }
        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
            role,
        });

        //Return user data with JWT
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id)
        })

    } catch (error) {
        return res.status(500).json({ message: "Server error", message: error.message });
    }
};

//@desc Login user
//@route POST /api/auth/login
//@access Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'Invalid email & password' });
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email & password' });
        }

        //Return user data with Jwt
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
};


const otpHash = (otp) => crypto.createHash('sha256').update(otp).digest('hex');

const verifyEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'Email is required' });
        const user = await User.findOne({ email: email.toLowerCase() });
        if (user) {
            const otp = crypto.randomInt(100000, 1000000).toString();
            user.passwordResetOtpHash = otpHash(otp);
            user.passwordResetOtpExpires = new Date(Date.now() + 300000);
            await user.save();
            sendOtpEmail(user.email, otp)
        }
        return res.json({ message: 'If that email exists, a reset OTP has been sent.' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const verifyResetOtp = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email?.toLowerCase(), passwordResetOtpHash: otpHash(req.body.otp || ''), passwordResetOtpExpires: { $gt: new Date() } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }
        return res.json({ message: 'OTP verified successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        if (!newPassword || newPassword.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long' });
        }
        const user = await User.findOne({ email: email?.toLowerCase(), passwordResetOtpHash: otpHash(otp || ''), passwordResetOtpExpires: { $gt: new Date() } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }
        user.password = await bcrypt.hash(newPassword, 10);
        user.passwordResetOtpHash = undefined;
        user.passwordResetOtpExpires = undefined;
        await user.save();
        return res.json({ message: 'Password reset successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//@desc Get user profile
//@route GET /api/auth/profile
//@access Private (Requires JWT)
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log("user=", user)
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

//@desc Update user profile
//@route PUT/api/auth/profile
//@access Private (Requires JWT)
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { name, email, profileImageUrl } = req.body;

        // Check if the new email is already used by another user
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email: email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email already in use by another user' });
            }
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.profileImageUrl = profileImageUrl || user.profileImageUrl;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            token: generateToken(updatedUser._id)
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



module.exports = { registerUser, loginUser, verifyEmail, verifyResetOtp, resetPassword, getUserProfile, updateUserProfile }