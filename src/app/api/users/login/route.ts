import User from "@/models/model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbconfig";
import jwt from "jsonwebtoken"


connect()

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {email,password}=reqBody
        console.log(reqBody)
        
        //chk if user exist or not
        const userexist=await User.findOne({email})
        if(!userexist){
           return NextResponse.json({error: "user does not exist "},{
            status:500
           })
        }

        const validatepass=bcryptjs.compare(password,userexist.password)
        if(!validatepass){
            return NextResponse.json({error:"incorrect password"},{status:400})
        }

        const tokendata={
           id:userexist._id,
           email:userexist.email,
           password:userexist.password
        }

       const token=jwt.sign(tokendata,process.env.ACCESS_TOKEN_SECRET!,{expiresIn:"1d"})
       const response= NextResponse.json({
        message:"login successful",
        success:true,
    })

    response.cookies.set("token",token,{
        httpOnly:true,
    })
    return response;
        
    } 
    catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}