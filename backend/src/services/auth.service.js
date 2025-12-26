const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config();

const signup = async (data) => {
    const { username, email, password } = data;

    if (!username || !email || !password) {
        throw new Error("Some fields are missing");
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [{ username }, { email }],
        },
    });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
        },
    });

    return user;
};

const login = async (data) => {
    const { username, password } = data

    if (!username || !password) {
        throw new Error("Some fields are missing");
    }

    const user = await prisma.user.findUnique({
        where: {
            username
        }
    })

    if (!user) {
        throw new Error("User does not exists!");
    }

    const verify = await bcrypt.compare(password, user.password)

    if (!verify) {
        throw new Error("Incorrect Password")
    }

    const token = jwt.sign({ "userN": user.username }, process.env.JWT_SECRET, { "expiresIn": "30d" })

    return {
        message: "Login successful",
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
        },
    };
}

module.exports = { signup, login };
