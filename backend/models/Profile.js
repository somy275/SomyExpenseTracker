import mongoose from "mongoose";

const ResetPassSchema = new mongoose.Schema({
    UserId: { type: String, required: true },
    Token: { type: String, required: true },
    expiresAt: { type: Date, required: true }
}, { timestamps: true })
export const ResetPass = mongoose.model("Reset_Password", ResetPassSchema)

const VerifyEmailSchema = new mongoose.Schema({
    UserId: { type: String, required: true },
    EmailLink: { type: String, required: true },
    EmailToken: { type: String, required: true },
    expiresAt: { type: Date, required: true }
}, { timestamps: true })
export const VerifyEmail = mongoose.model("Verify_Email", VerifyEmailSchema)