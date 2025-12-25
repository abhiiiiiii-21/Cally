const prisma = require("../config/prisma");

const createvent = async (data) => {
    const {title, description, duration } = data;

    if (!title || !description || !duration) {
        throw new Error("Some fields are missing");
    }

    const checking = await prisma.checking.findFirst({
        where: {
            title: title,
        },
    });

    if (checking) {
        throw new Error("Event with this title already exists");
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

module.exports = {createvent};