const {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent,
    duplicateEvent
} = require("../services/event.service")

const createEventController = async (req, res) => {
    try {
        const userId = req.user.userId;

        const event = await createEvent(req.body, userId);
        return res.status(201).json(event);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const getAllEventController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const search = req.query.search;

        const events = await getAllEvents(userId, search);
        return res.status(200).json(events);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const updateEventController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const eventId = Number(req.params.id);

        const result = await updateEvent(eventId, req.body, userId);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


const deleteEventController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const eventId = Number(req.params.id);

        await deleteEvent(eventId, userId);
        return res.status(204).send();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


const duplicateEventController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const eventId = Number(req.params.id);

        const event = await duplicateEvent(eventId, userId);
        return res.status(201).json(event);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


module.exports = { createEventController, getAllEventController, updateEventController, deleteEventController, duplicateEventController }