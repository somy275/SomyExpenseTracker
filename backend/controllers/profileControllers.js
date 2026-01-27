import { getHtmlFromMjmlTemplate } from "../lib/getMjmlEmailTemplate.js";
import { SendEmail } from "../middlewares/Email.config.js";
import { VerifyEmail } from "../models/Profile.js";
import { User } from "../models/User.js";
import { authenticateUser } from "../Services/auth.services.js";
import { createResetPasswordLink, createVerifyEmailLink, generateRandomEmailToken, VerifyLink, VerifyToken } from "../Services/email.services.js";
import argon from "argon2"
export const ProfileUpdate = async (req, res) => {

    if (!req.user) return res.status(400).json({ message: "User does not exist." })
    const { FullName, Email, avatar } = req.body;
    if (!FullName || !Email) {
        return res.status(404).json({ message: "All fields are required" })
    }
    try {
        const user = await User.findById(req.user.id)
        if (!user) return res.status(400).json({ message: "User does not exist." })
        if (user.Email == Email) { //If the Email is same, then only update the FullName and avatar
            await User.updateOne({ _id: user._id }, { FullName, avatar })
        }
        else {
            //check email is already exist or not
            const EmailExist = await User.findOne({ Email })
            if (EmailExist) return res.status(404).json({ message: "Email is already exist" }) //If the email is different and not already exist, then update the email
            await User.updateOne({ _id: user._id }, { Email })
        }
        await authenticateUser(req, res, user._id, FullName, Email)
        return res.status(200).json({ message: "Profile updated successfully" })


    }
    catch (err) {
        return res.status(400).json({ message: "Something went wrong. Please try again later." })
    }
}

export const PasswordChange = async (req, res) => {
    if (!req.user) return res.status(400).json({ message: "User does not exist." })
    const { Current_Pass, New_Pass } = req.body;

    if (!Current_Pass || !New_Pass) {
        return res.status(404).json({ message: "All fields are required" })
    }
    const user = await User.findById(req.user.id)
    const isValidPassword = await user.comparePassword(Current_Pass)
    if (!isValidPassword) {
        return res.status(400).json({ message: "Current password does not match." });
    }
    const hashPass = await argon.hash(New_Pass)
    await User.updateOne({ _id: user._id }, { Password: hashPass })
    return res.status(200).json({ message: "Password Changed successfully" });
}

export const ResetPassword = async (req, res) => {
    try {
        const { Email } = req.body;
        const user = await User.findOne({ Email })
        if (!user) return res.status(400).json({ message: "Email does not exist" })
        if (user) {
            const resetPasswordLink = await createResetPasswordLink(user._id)
            const html = await getHtmlFromMjmlTemplate("ResetPassword", {
                name: user.FullName,
                email: user.Email,
                link: resetPasswordLink
            })

            SendEmail({
                to: user.Email,
                subject: "Reset your password",
                html
            })
        }
        return res.status(200).json({ Email: user.Email })
    }
    catch (err) {
        return res.status(400).json({ message: "Something went wrong." })
    }

}

export const VerifyResetToken = async (req, res) => {
    try {
        const { token } = req.params;
        const ResetPassData = await VerifyToken(token)
        if (!ResetPassData) return res.status(400).json({ message: "Token is invalid or expired" })
        return res.status(200).json({ message: "Reset link is Verified successfully.", ResetUserId: ResetPassData.UserId })

    }
    catch (err) {
        return res.status(400).json({ message: "Something went wrong." })
    }
}

export const ResetPasswordChange = async (req, res) => {
    try {
        const { New_Pass, ResetUserId } = req.body;
        if (!New_Pass) return res.status(404).json({ message: "New Password is required" })
        const hashPass = await argon.hash(New_Pass)
        await User.updateOne({ _id: ResetUserId }, { Password: hashPass })
        return res.status(200).json({ message: "Password Changed successfully" });

    }
    catch (err) {
        return res.status(400).json({ message: "Something went wrong." })

    }
}

//Email Verification
export const EmailVerification = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ message: "User does not exist." })
        const { Email } = req.body;
        const user = await User.findOne({ Email })
        if (!user) return res.status(400).json({ message: "Email does not exist" })
        const randomEmailToken = await generateRandomEmailToken()
        const verifyEmailLink = await createVerifyEmailLink(user._id, randomEmailToken)
        const html = await getHtmlFromMjmlTemplate("VerifyEmail", {
            name: user.FullName,
            email: user.Email,
            link: verifyEmailLink,
            token: randomEmailToken
        })
        SendEmail({
            to: user.Email,
            subject: "Verify Your Email",
            html
        })
        return res.status(200).json({ Email: user.Email })
    }
    catch (err) {
        return res.status(400).json({ message: "Something went wrong." })
    }
}

export const VerifyEmailLink = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ message: "User does not exist." })
        const { link } = req.params;
        const verifyLink = await VerifyLink(link);
        if (!verifyLink) return res.status(400).json({ message: "Link is invalid or expired" })
        await User.updateOne({ _id: verifyLink.UserId }, { isEmailVerified: true })
        await VerifyEmail.deleteMany({ UserId: verifyLink.UserId })
        return res.status(200).json({ message: "Reset link is Verified successfully.", VerifyEmailUserId: verifyLink.UserId })
    }
    catch (err) {
        return res.status(400).json({ message: "Something went wrong." })
    }
}

export const EmailVerificationCode = async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) return res.status(400).json({ message: "Email verification code is required" })
        const user = await VerifyEmail.findOne({ EmailToken: code })
        if (!user) return res.status(400).json({ message: "Verification code is expired or invalid" })
        await User.updateOne({ _id: user.UserId }, { isEmailVerified: true })
        await VerifyEmail.deleteMany({ UserId: user.UserId })
        return res.status(200).json({ message: "Token is Verified successfully", VerifyEmailUserId: user.UserId })
    }
    catch (err) {
        return res.status(400).json({ message: "Something went wrong." })
    }
}