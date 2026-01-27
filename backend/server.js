import dotenv from "dotenv"
import express from "express"
import path from "path"
import cors from "cors"
import {createServer} from "http"
import {Server} from "socket.io"
import { ConnectDB } from "./config/db.js"
import { authRoutes } from "./routes/authRoutes.routes.js"
import { incomeRoutes } from "./routes/income.routes.js"
import requestip from "request-ip"
import cookieParser from "cookie-parser"
import { expenseRoutes } from "./routes/expense.routes.js"
import { dashboardRoutes } from "./routes/dashboard.routes.js"
import { pingRoutes } from "./routes/ping.routes.js"
import { profileRoutes } from "./routes/profileRoutes.routes.js"
import { settingRoutes } from "./routes/settings.routes.js"
import  jwt  from "jsonwebtoken"
import { User } from "./models/User.js"
dotenv.config()
const app = express();
const server=createServer(app);
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-type", "Authorization"],
    credentials: true
}))
app.use(express.json());
// const io=new Server(server,{
//     cors:{
//     origin: process.env.CLIENT_URL,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-type", "Authorization"],
//     credentials: true
//     }
// })
// io.use((socket,next)=>{
//     const cookies=cookieParser()(socket.request,{},(err)=>{
//          if (err) return next(new Error("Cookie parsing failed"));
//            const token = socket.request.cookies?.access_token;
//     if (!token) return next(new Error("Unauthorized: Missing token"));
//     try{
//         const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
//         if(!decoded){
//             socket.disconnect()
//         }
//         next()
//     }
//     catch(err){
//     console.error("JWT verification failed:", err.message);
//      next(new Error("Unauthorized: Invalid or expired token"));
//     }
//     })
// })
// io.on("connection",async(socket)=>{
//    await User.updateOne({lastActive:Date.now()})
//     socket.on("disconnect",()=>{
//         console.log("disconnected");
        
//     })
// })
// app.use("/api", pingRoutes)
app.use(requestip.mw())
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/income", incomeRoutes)
app.use("/api/v1/expense", expenseRoutes)
app.use("/api/v1/dashboard", dashboardRoutes)
app.use("/api/v1/profile", profileRoutes)
app.use("/api/v1/settings", settingRoutes)
ConnectDB()
app.use("/uploads", express.static(path.join(import.meta.dirname, "uploads")))
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);

})