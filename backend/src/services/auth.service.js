const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const signup = async (data) => {
    const { username, email, password } = data;

    if (!username || !email || !password) {
        throw new Error("Some fields are missing");
    }

    const normalizedEmail = email.toLowerCase().trim();
    const normalizedUsername = username.trim().toLowerCase();

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [{ email : normalizedEmail }, { username :normalizedUsername }],
        },
    });

    if (existingUser) {
        throw new Error("User already exists");
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            username : normalizedUsername,
            email : normalizedEmail,
            password: hashedPassword,
        },
    });

    const token = jwt.sign({ "userId": user.id }, process.env.JWT_SECRET, { "expiresIn": "30d" })

    return {
        message: "Signup successful",
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        }
    }
};

const login = async (data) => {
    const { email, password } = data

    if (!email || !password) {
        throw new Error("Some fields are missing");
    }

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        throw new Error("User does not exists!");
    }

    const verify = await bcrypt.compare(password, user.password)

    if (!verify) {
        throw new Error("Incorrect Password")
    }

    const token = jwt.sign({ "userId": user.id }, process.env.JWT_SECRET, { "expiresIn": "30d" })

    return {
        message: "Login successful",
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        }
    };
}

module.exports = { signup, login };
