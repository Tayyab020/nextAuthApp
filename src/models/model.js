import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please Provide a Username"],
        unique:true,
    },
    email:{
        type:String,
        required:[true, "Please Provide a Email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true, "Please Provide a Password"],
    },
    isVerifyed:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verfiyToken:String,
    verfiyTokenExpiry:Date
})
const User = mongoose.models.users || mongoose.model("users" , userSchema)
export default User
// module.default.exports = mongoose.model("users", userSchema , 'User')
