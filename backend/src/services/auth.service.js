const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");

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

module.exports = { signup };
