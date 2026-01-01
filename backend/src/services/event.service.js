const prisma = require("../config/prisma");



const createEvent = async (data) => {
    const { title, description, duration } = data;

    if (!title || !description || !duration) {
        throw new Error("Some fields are missing");
    }

    const event = await prisma.event.create({
        data: {
            title,
            description,
            duration
        },
    });

    return event;
}

const getAllEvents = async () => {
    const events = await prisma.event.findMany();
    return events;
}

const updateEvent = async (id, data) => {
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


    const event = await prisma.event.update({
        where: { id },
        data: {
            ...(title !== undefined && { title }),
            ...(description !== undefined && { description }),
            ...(duration !== undefined && { duration }),
            ...(showOnProfile !== undefined && { showOnProfile }),
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

const duplicateEvent = async (id) => {
    const event = await prisma.event.findUnique({
        where : {id}
    })

    if (!event){
        throw new Error("Event does not exist!");
    }

    const dupEvent = await prisma.event.create({
        data : {
            title : `${event.title} (copy)`,
            description : event.description,
            duration : event.duration,
            showOnProfile : event.showOnProfile
        }
    })

    return dupEvent
}


module.exports = {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent,
    duplicateEvent
}