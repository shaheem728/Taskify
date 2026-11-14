const mongoose = require('mongoose');
const User = require("../models/User");
const Task = require("../models/Task")
const Membership = require("../models/Membership")
const bcrypt = require('bcryptjs');

//@desc Register a new member in the admin's organization
//@route POST /api/auth/register-member
//@access Private (Admin only)
const createUser = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        // Validate that admin belongs to an organization
        const organizationId = req.user.organizationId;
        if (!organizationId) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "Admin is not associated with any organization" });
        }

        // 1. Check if user already exists
        const userExists = await User.findOne({ email }).session(session);
        if (userExists) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "User already exists" });
        }

        // 2. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create new user
        const [user] = await User.create([{
            name,
            email,
            password: hashedPassword,
            role: 'member',
        }], { session });

        // 4. Create Membership linking the new user to the admin's organization
        await Membership.create([{
            userId: user._id,
            organizationId: organizationId,
            role: 'member',
        }], { session });

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        // 5. Return response
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            organizationId,
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


//@desc Get all users (Admin only)
//@route Get/api/users/
//@access Private (Admin)
const getUser = async (req, res) => {
    try {
        // Return only users who are members of the requester's organization (data isolation)
        const memberships = await Membership.find({
            organizationId: req.user.organizationId,
            role: "member"
        }).populate('userId', '-password');
        const users = memberships.map((m) => m.userId).filter(Boolean);

        //Add task counts to each user
        const userWithTaskCounts = await Promise.all(users.map(async (user) => {
            const pendingTasks = await Task.countDocuments({ assignedTo: user._id, status: "Pending" });
            const inProgressTasks = await Task.countDocuments({ assignedTo: user._id, status: "In Progress" });
            const completedTasks = await Task.countDocuments({ assignedTo: user._id, status: "Completed" });

            return {
                ...user._doc, //Include all 
                pendingTasks,
                inProgressTasks,
                completedTasks
            };
        }))
        res.json(userWithTaskCounts)
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}
//@desc Get user by ID
//@route Get/api/users/:id
//@access Private
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        // Ensure the requested user belongs to the requester's organization (data isolation)
        const membership = await Membership.findOne({ userId: user._id, organizationId: req.user.organizationId });
        if (!membership) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

//@desc Delete a user (Admin only)
//@route Delete /api/users/:id
//@access Private (Admin)
const deleteUser = async (req, res) => {
    try {
        // Find the user (exclude password) and ensure it exists
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Verify the user belongs to the same organization as the requester
        const membership = await Membership.findOne({
            userId: user._id,
            organizationId: req.user.organizationId,
        });
        if (!membership) {
            return res.status(403).json({ message: "Forbidden: user not in your organization" });
        }
        // Delete the membership record first (optional, depending on cascade rules)
        await Membership.deleteOne({ _id: membership._id });
        // Delete the user document itself
        await User.deleteOne({ _id: user._id });
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createUser, deleteUser, getUser, getUserById };