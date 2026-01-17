const express = require('express')
const { getUserController, updateUserController, deleteUserController, passwordUserController, exportUserDataController, updateUserProfilePicController } = require('../controllers/user.controller')

const router = express.Router()
const { authMiddleware } = require('../middlewares/auth.middleware')
const upload = require('../middlewares/multer.middleware')

router.get('/me', authMiddleware, getUserController)
router.put('/me', authMiddleware, updateUserController)
router.delete('/me', authMiddleware, deleteUserController)
router.post('/change-password', authMiddleware, passwordUserController)
router.get('/export-data', authMiddleware, exportUserDataController)
router.post('/upload-profile-pic', authMiddleware, upload.single('profilePic'), updateUserProfilePicController)

module.exports = router
