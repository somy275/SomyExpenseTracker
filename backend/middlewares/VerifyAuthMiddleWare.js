import jwt from "jsonwebtoken"
import { User } from "../models/User.js"
export const Protect = async (req, res, next) => {
    const accessToken = req.cookies.access_token

    if (!accessToken) return res.status(401).json({ message: "Not authenticated" });
    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id).select("-Password")
        next();
    } catch {
        return res.status(401).json({ message: "Access token expired" });
    }
}

//     if (!token) return res.status(401).json({ message: "Not authorized, no token" })
//         try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = await User.findById(decoded.id).select("-Password")
//     console.log(req.user);
//     // next()

//     // res.json({decoded})
// } catch (err) {

//         return res.status(401).json({ message: "Not authorized, token failed" })
//     }
