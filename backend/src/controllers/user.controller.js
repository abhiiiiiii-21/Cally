const { getUser, updateUser, deleteUser, changeUserPassword, exportUserData } = require('../services/user.service');

const getUserController = async (req, res) => {
    try {
        // userId : id is taken from the jwt
        const user = await getUser(req.user.userId)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ "message": error.message })
    }
}

const updateUserController = async (req, res) => {
    try {
        const user = await updateUser(req.user.userId, req.body)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ "message": error.message })
    }
}

const deleteUserController = async (req, res) => {
    try {
        const user = await deleteUser(req.user.userId)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ "message": error.message })
    }
}

const passwordUserController = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ "message": "Current password and New password are required!" })
        }
        const user = await changeUserPassword(req.user.userId, oldPassword, newPassword)
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ "message": error.message })
    }
}

const exportUserDataController = async (req, res) => {
    try {
        const exportData = await exportUserData(req.user.userId)
        return res.status(200).json(exportData)
    } catch (error) {
        return res.status(400).json({ "message": error.message })
    }
}



module.exports = { getUserController, updateUserController, deleteUserController, passwordUserController, exportUserDataController }