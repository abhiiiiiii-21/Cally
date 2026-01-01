const {
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent,
    duplicateEvent
} = require("../services/event.service")

const createEventController = async (req, res) => {
    try {
        const event = await createEvent(req.body)
        return res.status(201).json(event)
    } catch (error) {
        return res.status(400).json({ "message": error.message })
    }
}

const getAllEventController = async (req, res) => {
    try {
        const events = await getAllEvents()
        return res.status(201).json(events)
    } catch (error) {
        return res.status(400).json({ "message": error.message })
    }
}

const updateEventController = async (req, res) => {
    try {
        const event = await updateEvent(Number(req.params.id),req.body)
        return res.status(201).json(event)
    } catch (error) {
        return res.status(400).json({ "message": error.message })
    }
}

const deleteEventController = async (req, res) => {
    try {
        const event = await deleteEvent(Number(req.params.id))
        return res.status(204).json(event)
    } catch (error) {
        return res.status(400).json({ "message": error.message })
    }
}

const duplicateEventController = async (req, res) => {
    try {
        const event = await duplicateEvent(Number(req.params.id))
        return res.status(201).json(event)
    } catch (error) {
        return res.status(400).json({ "message": error.message })
    }
}


module.exports = { createEventController, getAllEventController, updateEventController, deleteEventController, duplicateEventController }