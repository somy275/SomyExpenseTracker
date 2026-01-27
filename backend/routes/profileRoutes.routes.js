import { Router } from "express";
import { Protect } from "../middlewares/VerifyAuthMiddleWare.js";
import { EmailVerification, EmailVerificationCode, PasswordChange, ProfileUpdate, ResetPassword, ResetPasswordChange, VerifyEmailLink, VerifyResetToken } from "../controllers/profileControllers.js";
const router = Router();
router.put("/profile-update", Protect, ProfileUpdate)
router.put("/change-password", Protect, PasswordChange)
router.post("/reset-password", ResetPassword)
router.get("/resetPassword/:token", VerifyResetToken)
router.put("/reset-password-change", ResetPasswordChange)
router.post("/email-verification", Protect, EmailVerification)
router.get("/email-verification/:link", Protect, VerifyEmailLink)
router.post("/email-verification-code", Protect, EmailVerificationCode)
export const profileRoutes = router