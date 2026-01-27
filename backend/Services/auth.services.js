import mongoose from "mongoose"
import  { Oauth,getOauthSession,  Session, User } from "../models/User.js"
import jwt from "jsonwebtoken"
export const authenticateUser = async (req, res, id, FullName, Email) => { //Authenticate User
    const session = await createSession(id, { //Create Session
        IP: req.clientIp,
        UserAgent: req.headers["user-agent"]
    })

    //Creating Access Token
    const accessToken = await createAccessToken({
        id, FullName, Email, SessionID: session._id
    })

    const baseConfig = { httpOnly: true, secure: true,sameSite:"None" }
    //Create Refresh Token
    const refreshToken = await createRefreshToken(session._id)
    //set Access Token in cookie as a respone
    res.cookie("access_token", accessToken, {
        ...baseConfig, maxAge: 1000 * 60 * 60
    })
    //set Refresh Token in cookie as a response
    res.cookie("refresh_token", refreshToken, {
        ...baseConfig, maxAge: 7 * 24 * 60 * 60 * 1000
    })
    

}

export const createSession = async (UserId, { IP, UserAgent }) => {
    
    await Session.deleteMany({  //Clear the previously stored session
        UserId
    })
    return await Session.create({ //Store the session data
        UserId, IP, UserAgent
    })
}

export const createAccessToken = async ({ id, FullName, Email, SessionID }) => {
    return jwt.sign({ id, FullName, Email, SessionID }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h"
    })
}

export const createRefreshToken = async (sessionId) => {
    return jwt.sign({ sessionId }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d"
    })
}


export const getUserWithOauthId=async({provider,email})=>{
    const userData=await User.findOne({Email:email});
    
    if(!userData){
         return null
    }

 console.log(userData._id);
    
    const OauthData=await Oauth.findOne({Provider:provider,UserId:userData._id})
     return {
        userId: userData._id,
        name: userData.FullName,
        email: userData.Email,
        isEmailValid: userData.isEmailValid,
        provider: OauthData ? OauthData.Provider : "",
        providerAccountId: OauthData ? OauthData.ProviderAccountId : ""
    }

}

export const linkUserWithOauth=async({UserId,Provider,ProviderAccountId,avatar})=>{ 
await Oauth.insertOne({UserId,Provider,ProviderAccountId})
if(avatar){
    await User.updateOne({_id:UserId},{
        $set:{
            avatar
        }
    })
}
}

export const createUserWithOauth=async({FullName,Email,Provider,ProviderAccountId,avatar})=>{
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const user = await User.create([{
            FullName,
            Email,
            isOauth:true,
            avatar,
            isEmailVerified: true
        }], { session });

        await Oauth.create([{
            UserId: user[0]._id,
            Provider,
            ProviderAccountId,
            avatar
        }], { session });
        await session.commitTransaction();

        return {
            userId: user[0]._id
        };
    } catch (err) {
        await session.abortTransaction();
        console.error("Transaction failed:", err);
        throw err;
    } finally {
        await session.endSession();
    }
}