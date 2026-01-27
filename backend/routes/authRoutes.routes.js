import express from "express"
import { getFacebookLoginPage, getGithubCallbackLogin, getGithubLoginPage, getGoogleCallbackLogin, getGoogleLoginPage, getUserInfo, loginUser, logoutUser, RefreshTokens, registerUser } from "../controllers/authControllers.js";
import { Protect } from "../middlewares/VerifyAuthMiddleWare.js";
import { upload } from "../middlewares/uploadMiddleWare.js";
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/getUser", Protect, getUserInfo)
router.get("/logout", logoutUser)
router.post("/refresh-token", RefreshTokens)
router.post("/upload-image",Protect, upload.single("image"), (req, res) => {

    if (!req.file) {
        return res.status(404).json({ message: "No File uploaded" })
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
    return res.status(200).json({ imageUrl })
})

router.get("/google",getGoogleLoginPage)
router.get("/google/callback",getGoogleCallbackLogin)
router.get("/github",getGithubLoginPage)
router.get("/github/callback",getGithubCallbackLogin)
router.get("/facebook",getFacebookLoginPage)
export const authRoutes = router;