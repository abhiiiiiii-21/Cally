const {getMe} = require('../services/user.service');

const getMeController = async (req,res) => {
    try {
        const user = await getMe(req.user.id)
        return res.status(200).json(user)
    } catch (error) {
        
    }
}

module.exports = {getMeController}