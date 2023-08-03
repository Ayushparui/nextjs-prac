import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest){
    try {
        
        const reqBody = await request.json()
        const {email, password} = reqBody
        console.log(reqBody)


        // Check if User already exists

        const user = await User.findOne({email, isVerified: true})

        if(!user){
            console.log("User does not exist or email not verified")
            return NextResponse.json({error: "User does not exist or email not verified"}, {status: 400})
        }

        // Check if password is correct

        const validPassword = await bcryptjs.compare(password, user.password)

        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }


        // Create a token data for cookies

        const tokenData = {
            id: user._id,
            email: user.email
        }

        // Create a token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1h"})

        // Create a Response cookie

        const response = NextResponse.json({
            message: "User logged in successfully",
            success: true
        })
        response.cookies.set("token", token, {httpOnly: true})
        return response


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}