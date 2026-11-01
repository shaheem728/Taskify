const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema(
    {
        orgname: { type: String, required: true, trim: true },
        ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Organization", organizationSchema);