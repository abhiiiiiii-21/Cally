import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

import eventsRouter from "./routes/events.js";
import bookingsRouter from "./routes/bookings.js";

import authenticateToken from "./middleware/auth.js";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use("/events", eventsRouter);
app.use("/bookings", bookingsRouter);

app.get("/auth/me", authenticateToken, async (req, res) => {
    try {
        console.log("GET /auth/me request received");
        console.log("User from token:", req.user);
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                username: true,
                email: true,
                imageUrl: true,
                name: true
            }
        });

        if (!user) {
            console.log("User not found in DB");
            return res.sendStatus(404);
        }

        console.log("User found:", user);

        res.json({
            user: {
                name: user.name || user.username,
                email: user.email,
                avatar: user.imageUrl || "/Profile/Avatar1.png"
            }
        });
    } catch (error) {
        console.error("Auth Me Error:", error);
        res.sendStatus(500);
    }
});

app.post("/auth/sign-up", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userByEmail = await prisma.user.findUnique({ where: { email } });
        if (userByEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const userByUsername = await prisma.user.findUnique({ where: { username } });
        if (userByUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });


        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            token: token,
        });

    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


app.post("/auth/log-in", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(400).json({ message: "Email does not exist" });
        }

        const userPassword = await bcrypt.compare(password, user.password)

        if (!userPassword) {
            return res.status(400).json({ message: "Wrong password" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );


        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            token: token,
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default app;


