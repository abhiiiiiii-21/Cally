const prisma = require('../config/prisma')
const bcrypt = require('bcrypt')

const getUser = async (userId) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            username: true,
            email: true,
            fullname: true,
            profilePic: true,
            about: true,
            createdAt: true,
            passwordUpdatedAt: true
        }
    })

    return user
}

const updateUser = async (userId, data) => {
    const { username, fullname, about } = data

    const updateData = {}

    if (username) {
        const existingUser = await prisma.user.findUnique({
            where: { username }
        })

        if (existingUser && existingUser.id !== userId) {
            throw new Error("Username already exists");
        }

        updateData.username = username
    }

    if (fullname !== undefined) {
        updateData.fullname = fullname
    }
    if (about !== undefined) {
        updateData.about = about
    }


    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: updateData,
        select: {
            id: true,
            username: true,
            fullname: true,
            about: true
        }
    })

    return user
}

const updateUserProfilePic = async (userId,data) => {
    const {profilePic} = data

    const updatedProfilePic = {}

    if (profilePic !== undefined) {
        updatedProfilePic.profilePic = profilePic
    }

    const user = await prisma.user.update({
        where : {
            id : userId
        },
        data : {
            profilePic : updatedProfilePic.profilePic
        }
    })

    return user
    
}

const changeUserPassword = async (userId, oldPassword, newPassword) => {
    const user = await prisma.user.findUnique({
        where: {
            id : userId
        }
    })

    if (!user) {
        throw new Error("User does not exists");

    }

    const checkingOldPass = await bcrypt.compare(oldPassword, user.password)

    if (!checkingOldPass) {
        throw new Error("Your password is wrong!");
    }

    const hashedNewPass = await bcrypt.hash(newPassword, 10)

    await prisma.user.update({
        where: { id: userId },
        data: {
            password: hashedNewPass,
            passwordUpdatedAt: new Date()
        }
    })

    return { "message": "Password changed successfully!" }
}

const deleteUser = async (userId) => {
    const result = await prisma.user.findUnique({
        where: { id: userId }
    })

    if (!result) {
        throw new Error("UserId does not exists");
    }


    await prisma.user.delete({
        where: { id: userId }
    })

    return { "message": "User Deleted Successfully!" }
}


// const logoutUser = async (userId) => {
//     const logout = await prisma.user.findUnique({
//         where: { id: userId }
//     })



// }

module.exports = { getUser, updateUser, updateUserProfilePic, deleteUser, changeUserPassword }