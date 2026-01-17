const express = require('express')
const { getUserController, updateUserController, deleteUserController, passwordUserController, exportUserDataController } = require('../controllers/user.controller')

const router = express.Router()
const { authMiddleware } = require('../middlewares/auth.middleware')

router.get('/me', authMiddleware, getUserController)
router.put('/me', authMiddleware, updateUserController)
router.delete('/me', authMiddleware, deleteUserController)
router.post('/change-password', authMiddleware, passwordUserController)
router.get('/export-data', authMiddleware, exportUserDataController)

module.exports = router
