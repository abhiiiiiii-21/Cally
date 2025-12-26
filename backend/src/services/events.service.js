const prisma = require("../config/prisma");



const createEvent = async (data) => {
    const { title, description, duration } = data;

    if (!title || !description || !duration) {
        throw new Error("Some fields are missing");
    }

    const checking = await prisma.event.findFirst({
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

const getAllEvents = async () => {
    const events = await prisma.event.findMany();
    return events;
}

const updateEvents = async (id, data) => {
    const { title, description, duration, showOnProfile } = data;

    const event = await prisma.event.update({
        where: {
            id: id,
        },
        data: {
            title,
            description,
            duration,
            showOnProfile
        },
    });

    return event;
}

const deleteEvent = async (id) => {
    const event = await prisma.event.delete({
        where: {
            id: id,
        },
    });

    return event;
}

module.exports = {
    createEvent,
    getAllEvents,
    updateEvents,
    deleteEvent
}