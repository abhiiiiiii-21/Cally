const prisma = require('../config/prisma')

const getAllMeetings = async () => {
    const data = await prisma.user.findMany()
    return data
}

