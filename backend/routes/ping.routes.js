import { Router } from "express";
import { Protect } from "../middlewares/VerifyAuthMiddleWare.js";
import { UpdateLastActive } from "../middlewares/UpdateLastActive.js";
import { User } from "../models/User.js";
const router = Router()
router.get("/ping", Protect, UpdateLastActive, async (req, res) => {
    const lastActive = await User.findById(req.user._id).select("lastActive")
    res.json(lastActive)
})
export const pingRoutes = router;