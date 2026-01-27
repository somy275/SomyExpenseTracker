import { User } from "../models/User.js"

export const UpdateLastActive = async (req, res, next) => {
    if (req.user && req.user._id) {
        try {
            await User.findByIdAndUpdate(req.user._id, { lastActive: new Date() })


        }
        catch (err) {
            res.status(400).json({ message: "Error Updating Last Active" })
        }
    }
    next()
}