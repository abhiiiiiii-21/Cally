const prisma = require("../config/prisma");

const createEvent = async (data, userId) => {
    const { title, description, duration, showOnProfile } = data;

    if (!title || !description || duration == null) {
        throw new Error("Some fields are missing");
    }

    if (duration <= 0) {
        throw new Error("Duration must be greater than 0");
    }

    const event = await prisma.event.create({
        data: {
            title,
            description,
            duration,
            userId,
            showOnProfile: showOnProfile !== undefined ? showOnProfile : true
        },
    });

    return event;
}

const getAllEvents = async (userId) => {
    const events = await prisma.event.findMany({
        where: { userId },
        orderBy: {
            createdAt: "desc"
        }
    });
    return events;
}

const updateEvent = async (id, data, userId) => {
    const { title, description, duration, showOnProfile } = data;

    if (title !== undefined && title.trim() === "") {
        throw new Error("Title cannot be empty");
    }

    if (description !== undefined && description.trim() === "") {
        throw new Error("Description cannot be empty");
    }

    if (duration !== undefined && duration <= 0) {
        throw new Error("Duration must be greater than 0");
    }


    const result = await prisma.event.updateMany({
        where: {
            id,
            userId,
        },
        data: {
            ...(title !== undefined && { title }),
            ...(description !== undefined && { description }),
            ...(duration !== undefined && { duration }),
            ...(showOnProfile !== undefined && { showOnProfile }),
        },
    });

    if (result.count === 0) {
        throw new Error("Event not found or unauthorized");
    }

    return result;
}

const deleteEvent = async (id, userId) => {
    const event = await prisma.event.deleteMany({
        where: {
            id,
            userId
        },
    });

    if (event.count === 0) {
        throw new Error("Event not found or unauthorized");
    }

    return event;
}

const duplicateEvent = async (id, userId) => {

    const event = await prisma.event.findFirst({
        where: {
            id,
            userId,
        },
    });

    if (!event) {
        throw new Error("Event does not exist!");
    }

    const dupEvent = await prisma.event.create({
        data: {
            title: `${event.title} (copy)`,
            description: event.description,
            duration: event.duration,
            showOnProfile: event.showOnProfile,
            userId,
        },
    });

    return dupEvent
}


module.exports = {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent,
    duplicateEvent
}