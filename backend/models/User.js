import mongoose from "mongoose";
import argon from "argon2"
const UserSchema = new mongoose.Schema({  // Create User Schema
    FullName: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, default:null,
        validate:{
            validator:function(value){
                 // Require Password only if isOauth is false
                if(!this.isOauth && !value){
                    return false
                }
                return true
            },
              message: "Password is required unless using OAuth."
        }
     },
    avatar: { type: String, default: null },
    isEmailVerified: { type: Boolean, default: false },
    isOauth:{type:Boolean,default:false},  // Flag to determine if it's an OAuth user
    lastActive: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

UserSchema.pre("save", async function (next) {  //Hash password before saving
    if (!this.isModified('Password')) {  //Only hash if password is changed/modified
        return next()
    }
    try {
        this.Password = await argon.hash(this.Password)
        next()
    } catch (err) {
        next(err)
    }
})

//Compare Password
UserSchema.methods.comparePassword = async function (inputPassword) {
    return await argon.verify(this.Password, inputPassword)
}

export const User = mongoose.model("User", UserSchema)


const SessionSchema = new mongoose.Schema({
    UserId: { type: String, required: true },
    IP: { type: String, required: true },
    UserAgent: { type: String, required: true }
}, { timestamps: true })
export const Session = mongoose.model("Session_Data", SessionSchema)


const OauthSchema=new mongoose.Schema({
    UserId:{type:String,required:true, ref:"User"},
    Provider:{type:String, required:true},
    ProviderAccountId:{type:String,required:true},
    avatar:{type:String, default:null}
},{timestamps:true})
export const Oauth=mongoose.model("Oauth_Data",OauthSchema);
export async function getOauthSession() {
    return await mongoose.startSession();
}
