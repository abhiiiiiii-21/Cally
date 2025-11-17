import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req){
    try {
         const { email, password } = await req.json();

        if (!email || !password){
            return NextResponse.json({error : "All fields are required!"},{status : 400})
        }

        const checkingUser = await prisma.user.findUnique({
            where : {
                email
            }
        })


        if (!checkingUser){
            return NextResponse.json({error: "User does not exist"},{status : 401})
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            checkingUser.password
        );

        if (!isPasswordCorrect) {
            return NextResponse.json(
                { error: "Incorrect password!" },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            {
                id: checkingUser.id,
                email: checkingUser.email,
                username: checkingUser.username,
            },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        return NextResponse.json(
            {
                message: "Login successful",
                token,
                user: {
                    id: checkingUser.id,
                    username: checkingUser.username,
                    email: checkingUser.email,
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "Server error. Try again later." },
            { status: 500 }
        );
        
    }
}