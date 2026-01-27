import { z } from "zod"
export const EmailVerify = z.object({
    email: z.string().trim().email({
        message: "Please enter a valid email"
    }),
    Password: z.string().trim().min(8, {
        message: "please enter minimum 8 characters"
    })
})