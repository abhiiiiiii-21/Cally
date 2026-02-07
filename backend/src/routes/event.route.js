const express = require('express');
const {
  createEventController,
  getAllEventController,
  updateEventController,
  deleteEventController,
  duplicateEventController,
} = require("../controllers/event.controller");

const { authMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', createEventController);
router.get('/', getAllEventController);
router.put('/:id', updateEventController);
router.delete('/:id', deleteEventController);
router.post('/:id/duplicate', duplicateEventController);

module.exports = router;
