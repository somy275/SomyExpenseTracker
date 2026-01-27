import nodemailer from "nodemailer"
import { getHtmlFromMjmlTemplate } from "../lib/getMjmlEmailTemplate.js";
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "somyranjank@gmail.com",
        pass: "wpla cmlm oqbr siyt",
    },
});

export const SendEmail = async ({ to, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            from: 'somyranjank@gmail.com',
            to,
            subject,
            html // HTML body
        });
        console.log(info);

    }
    catch (err) {
        console.log(err);

    }
}

