import mongoose from "mongoose"
const CurrencySchema = new mongoose.Schema({
    UserId: { type: String, required: true },
    Currency: { type: String, default: "INR (₹)" },
    base_rate: { type: Number, default: 1 }
}, { timestamps: true })
export const Currency = mongoose.model("Currency_Data", CurrencySchema)