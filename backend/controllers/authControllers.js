import jwt from "jsonwebtoken";
import * as arctic from "arctic";
import { Session, User } from "../models/User.js";
import {
  authenticateUser,
  createAccessToken,
  createUserWithOauth,
  getUserWithOauthId,
  linkUserWithOauth,
} from "../Services/auth.services.js";
import { google } from "../lib/Oauth/google.js";
import { github } from "../lib/Oauth/github.js";
const generateToken = (id) => {
  //Generate a Json web token
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
};

export const registerUser = async (req, res) => {
  //Register User

  const { FullName, Email, Password, avatar } = req.body;
  //Validation: Check for missing fields
  if (!FullName || !Email || !Password) {
    return res.status(404).json({ message: "All fields are required" });
  }
  try {
    //check email is already exist or not
    const EmailExist = await User.findOne({ Email });
    if (EmailExist) {
      return res.status(404).json({ message: "Email is already exist" });
    }
    //Create the User
    const user = await User.create({
      FullName,
      Email,
      Password,
      avatar,
    });
    await authenticateUser(req, res, user._id, FullName, Email);
    return res.status(201).json({
      id: user._id,
      user,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error Registering User", error: err.message });
  }
};

//Login user
export const loginUser = async (req, res) => {
  const { Email, Password } = req.body;
  if (!Email || !Password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isValidPassword = await user.comparePassword(Password);
    if (!user || !isValidPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    await authenticateUser(req, res, user._id, user.FullName, user.Email);
    return res.status(200).json({
      id: user._id,
      user,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error Registering User", error: err.message });
  }
};

//User Info
export const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-Password");
    const SessionData = await Session.find({ UserId: user._id });
    const UserLastLogin = {
      lastLogin: SessionData[0].createdAt,
    };

    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user, UserLastLogin });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

//Refresh Tokens
export const RefreshTokens = async (req, res) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" });
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    const Sessiondata = await Session.findOne({ _id: decoded.sessionId }); //Find the user id if the refresh token is decoded correctly
    if (!Sessiondata) {
      return res.status(400).json({ message: "Invalid Session" });
    }
    const UserData = await User.findOne({ _id: Sessiondata.UserId }); //Find the user data if the session id exists
    if (!UserData) {
      res.status(400).json({ message: "User does not exists" });
    }
    //Create new Access Token
    const userInfo = {
      id: UserData._id,
      FullName: UserData.FullName,
      Email: UserData.Email,
      SessionID: decoded.sessionId,
      avatar: UserData.avatar,
    };
    const newAccessToken = await createAccessToken({
      id: UserData._id,
      FullName: UserData.FullName,
      Email: UserData.Email,
      SessionID: decoded.sessionId,
    });
    req.user = userInfo;
    //Set new Access token in cookie
    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      sameSite: "Lax",
      secure: true,
      maxAge: 1000 * 60 * 15,
    });

    res.json(userInfo);
  } catch {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: true,
    maxAge: 1000 * 60 * 15,
  });
  res.clearCookie("refresh_token");
  req.user = null;
  res.status(200).json({ message: "Log Out" });
};
//show Google login page
export const getGoogleLoginPage = (req, res) => {
    try{
        const state = arctic.generateState();
        const codeVerifier = arctic.generateCodeVerifier();
        const OautUrl = google.createAuthorizationURL(state, codeVerifier, [
            "openid",
            "profile",
            "email",
        ]);
          const cookieConfig = {
        httpOnly: true,
        secure: true,
        maxAge: 15 * 60 * 1000,
        SameSite: "lax"
    }
    res.cookie("google_Oauth_State", state, cookieConfig);
    res.cookie("google_Oauth_CodeVerifier", codeVerifier, cookieConfig)
        res.status(200).json(OautUrl.toString());
    }
    catch(err){
         res.status(403).json({ message: "Something went wrong. Please try again later." });
    }
};

export const getGoogleCallbackLogin=async(req,res)=>{
    const {state,code}=req.query;
    let token;
    const {
        google_Oauth_State: storedState,
        google_Oauth_CodeVerifier: codeVerifier
    } = req.cookies
    if (!state || !code || !storedState || state != storedState) {
        return res.status(404).send("Couldn't login with google because of invalid login attempt.")
    }
  try{
token=await google.validateAuthorizationCode(code,codeVerifier)
  }
 catch (err) {
        res.status(404).send("Couldn't login with google because of invalid login attempt.")
    }
    const claim=arctic.decodeIdToken(token.idToken())
      const { sub: googleUserId, name, email, picture } = claim
    let user=await getUserWithOauthId({  // get the user data if user is already linked with google
      provider:"google",
      email
    })
    if(user && !user.providerAccountId){ //link the user with google if user is already exist but not linked with google
await linkUserWithOauth({
  UserId:user.userId,
  Provider:"google",
  ProviderAccountId:googleUserId,
  avatar:picture
})
    }

    
    if(!user){
     user= await createUserWithOauth({
        FullName:name,Email:email,Provider:"google",ProviderAccountId:googleUserId, avatar:picture
      })
    }    
    await authenticateUser(req, res, user.userId, name, email);
  return res.redirect(`${process.env.CLIENT_URL}`);
}

//Github

export const getGithubLoginPage=(req,res)=>{
  try{

  const state = arctic.generateState()
    const url = github.createAuthorizationURL(state, [
        "user:email"
    ])

    const cookieConfig = {
        httpOnly: true,
        secure: true,
        maxAge: 15 * 60 * 1000,
        SameSite: "lax"
    }
    res.cookie("github_Oauth_State", state, cookieConfig);    
    res.status(200).json(url.toString());
  }
   catch(err){
         res.status(403).json({ message: "Something went wrong. Please try again later." });
    }

}

export const getGithubCallbackLogin=async(req,res)=>{
  const { state, code } = req.query
  let tokens;
    const {
        github_Oauth_State: storedState,
    } = req.cookies
    if (!state || !code || !storedState || state != storedState) {
        return res.status(404).send("Couldn't login with github because of invalid login attempt.")
    }
    try {
        tokens = await github.validateAuthorizationCode(code);

    }
    catch (err) {
        res.status(404).send("Couldn't login with github because of invalid login attempt.")
        return res.redirect("/login")
    }
    const githubResponse = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${tokens.accessToken()}`
        }
    })
    if (!githubResponse.ok) return res.status(404).send("Couldn't login with github because of invalid login attempt.")
    const githubUser = await githubResponse.json();
    const { id: githubUserId, name, avatar_url:avatar } = githubUser
    const githubEmailResponse = await fetch("https://api.github.com/user/emails", {
        headers: {
            Authorization: `Bearer ${tokens.accessToken()}`
        }
    })
    if (!githubEmailResponse.ok) return res.status(404).send("Couldn't login with github because of invalid login attempt.")
    const githubEmail = await githubEmailResponse.json();
    const email = githubEmail.filter((e) => e.primary)[0].email
     let user=await getUserWithOauthId({  // get the user data if user is already linked with google
      provider:"google",
      email
    })
    if(user && !user.providerAccountId){ //link the user with google if user is already exist but not linked with google
await linkUserWithOauth({
  UserId:user.userId,
  Provider:"github",
  ProviderAccountId:githubUserId,
  avatar
})
    }
    if(!user){
     user= await createUserWithOauth({
        FullName:name,Email:email,Provider:"github",ProviderAccountId:googleUserId, avatar:picture
      })
    }    
    await authenticateUser(req, res, user.userId, name, email);
  return res.redirect(`${process.env.CLIENT_URL}`);
  
}

//Facebook
export const getFacebookLoginPage=(req,res)=>{
  
}