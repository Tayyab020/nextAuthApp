import { getDataFromToken } from "@/helpers/getDataFronToken";

getDataFromToken;
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/model";
import { connect } from "@/dbConfig/dbconfig";

connect();
export async function GET(request:NextRequest){
    try {
       const userId=await getDataFromToken(request)
       const user=await User.findOne({_id:userId}).select("-password")
       return NextResponse.json({message:"user found",data:user})

    } catch (error:any) {
        return NextResponse.json({error:error.message})
    }
}