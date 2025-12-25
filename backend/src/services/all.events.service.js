const prisma = require("../config/prisma");

const allEvent = async (data) => {
    
    const event = await prisma.user.findMany()

    return event;
}


module.exports = {createvent};