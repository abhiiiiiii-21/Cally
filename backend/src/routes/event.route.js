const express = require('express')
const { createEventController, 
    getAllEventController, 
    updateEventController, 
    deleteEventController, 
    duplicateEventController } = require("../controllers/event.controller")


const router = express.Router()

router.post('/',createEventController)
router.get('/',getAllEventController)
router.put('/:id',updateEventController)
router.delete('/:id',deleteEventController)
router.post('/:id/duplicate',duplicateEventController)

module.exports = router