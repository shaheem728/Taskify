const jwt = require("jsonwebtoken")
const User = require("../models/User");
const Membership = require("../models/Membership");

//middleware to protect routes
const protect = async(req,res,next)=>{
    try{
        let token = req.headers.authorization 
        if(token && token.startsWith("Bearer")){
          token = token.split(" ")[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const user = await User.findById(decoded.id).select("-password");
          if (!user) {
            return res.status(401).json({message:"Not authorized, user not found"});
          }

          // Attach the user's organization so controllers can scope every query by organization.
          // This stops users of Organization A from seeing Organization B's users, tasks,
          // reports and dashboard data.
          const membership = await Membership.findOne({ userId: user._id })
            .populate('organizationId', 'orgname');

          user.organizationId = membership && membership.organizationId
            ? membership.organizationId._id
            : null;
          user.organization = membership && membership.organizationId
            ? membership.organizationId
            : null;

          req.user = user;
          next();
        }else {
            return res.status(401).json({message:"Not authorized, no token"});
        }
    }catch(error){
        res.status(401).json({message:"Token failed",error:error.message})
    }
}

// Middleware for Admin-only access
const adminOnly = (req,res,next)=>{
    if(req.user && req.user.role === "admin"){
        next()
    }else{
        return res.status(403).json({message:"Access denied, admin only "})
    }
}
module.exports = {protect,adminOnly};