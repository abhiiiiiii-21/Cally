const prisma = require("../config/prisma");

const updateEvent = async (id, data) => {
    const {title , description, duration, showOnProfile} = data;

    const existingEvent = await prisma.event.findUnique({
        where: {
            id: id,
        },
    });

    if (!existingEvent) {
        throw new Error("Event not found");
    }

    const updatedEvent = await prisma.event.update({
}