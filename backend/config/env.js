import {z} from "zod"
import dotenv from "dotenv"
dotenv.config()
const envSchema=z.object({
    GOOGLE_CLIENT_SECRET_KEY:z.string().min(1),
    GOOGLE_CLIENT_ID:z.string().min(1),
    GITHUB_CLIENT_ID:z.string().min(1),
    GITHUB_CLIENT_SECRET_KEY:z.string().min(1)

})

export const env=envSchema.parse(process.env)