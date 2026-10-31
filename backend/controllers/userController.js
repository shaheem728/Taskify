const User = require("../models/User");
const Task = require("../models/Task")
const Membership = require("../models/Membership")
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
// const deleteUser = async(req,res)=>{
//     try {

//     }catch(error){
//      res.status(500).json({message:"Server error",error:error.message})
//     }
// };
module.exports = { getUser, getUserById };