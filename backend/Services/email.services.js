import crypto from "crypto"
import { ResetPass, VerifyEmail } from "../models/Profile.js"
export const createResetPasswordLink = async (UserId) => {
    try {
        const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
        const randomToken = crypto.randomBytes(32).toString("hex")
        const tokenHash = crypto.createHash('sha256').update(randomToken).digest("hex")
        await ResetPass.deleteMany({ UserId })
        await ResetPass.create({ UserId, Token: tokenHash, expiresAt })
        return `${process.env.CLIENT_URL}/resetPassword/${randomToken}`
    }
    catch (err) {
        console.log(err);

    }
}

export const createVerifyEmailLink = async (UserId, randomEmailToken) => {
    try {
        const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
        const randomToken = crypto.randomBytes(32).toString("hex")
        const tokenHash = crypto.createHash('sha256').update(randomToken).digest("hex")
        await VerifyEmail.deleteMany({ UserId });
        await VerifyEmail.create({ UserId, EmailLink: tokenHash, EmailToken: randomEmailToken, expiresAt })
        return `${process.env.CLIENT_URL}/VerifyEmail/${randomToken}`
    }
    catch (err) {
        console.log(err);

    }
}

export const generateRandomEmailToken = (digit = 6) => {
    let min = 10 ** (digit - 1);
    let max = 10 ** digit
    return crypto.randomInt(min, max).toString()
}


export const VerifyToken = async (token) => {
    try {
        const tokenHash = crypto.createHash('sha256').update(token).digest("hex")
        const data = await ResetPass.findOne({
            $and: [
                {
                    Token: {
                        $eq: tokenHash
                    }
                },
                {
                    expiresAt: {
                        $gte: new Date(Date.now())
                    }
                }

            ]
        })
        return data;
    }
    catch (err) {
        return res.status(400).json({ message: "Something went wrong." })
    }

}

export const VerifyLink = async (link) => {
    try {
        const tokenHash = crypto.createHash('sha256').update(link).digest("hex")
        const data = await VerifyEmail.findOne({
            $and: [
                {
                    EmailLink: {
                        $eq: tokenHash
                    }
                },
                {
                    expiresAt: {
                        $gte: new Date(Date.now())
                    }
                }

            ]
        })
        return data;
    }
    catch (err) {
        return res.status(400).json({ message: "Something went wrong." })
    }
}