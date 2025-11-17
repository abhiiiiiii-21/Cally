import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/;

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        if (!passwordValidation.test(password)) {
            return NextResponse.json(
                {
                    error:
                        "Password must be at least 7 characters long, contain uppercase and lowercase letters, and include at least one number.",
                },
                { status: 400 }
            );
        }

        const existingUsername = await prisma.user.findUnique({
            where: { username },
        });

        if (existingUsername) {
            return NextResponse.json({ error: "Username already exists" }, { status: 409 });
        }

        const existingEmail = await prisma.user.findUnique({
            where: { email },
        });
        
        if (existingEmail) {
            return NextResponse.json({ error: "Email already exists" }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        if (!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY missing in env");
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        return NextResponse.json(
            {
                message: "User created successfully",
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                },
                token,
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: "Server error. Please try again later." },
            { status: 500 }
        );
    }
}
