const getMe = async (id) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            username: true,
            email: true,
            fullname: true,
            profilePic: true,
            about: true,
            createdAt: true
        }
    })

    return user
}

module.exports = { getMe }