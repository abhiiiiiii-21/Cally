const prisma = require("../config/prisma");


const createvent = async (data) => {
    const {title, description, duration } = data;

    if (!title || !description || !duration) {
        throw new Error("Some fields are missing");
    }

    const event = await prisma.event.create({
        data: {
            title,
            description,
            duration,
        },
    });

    return event;
}