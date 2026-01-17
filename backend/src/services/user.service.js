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

const updateUserProfilePic = async (userId, data) => {
    const { profilePic } = data

    const updatedProfilePic = {}

    if (profilePic !== undefined) {
        updatedProfilePic.profilePic = profilePic
    }

    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            profilePic: updatedProfilePic.profilePic
        }
    })

    return user

}

const changeUserPassword = async (userId, oldPassword, newPassword) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
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

const exportUserData = async (userId) => {

    const userData = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            username: true,
            email: true,
            fullname: true,
            profilePic: true,
            about: true,
            createdAt: true,
            updatedAt: true,
            passwordUpdatedAt : true,


            events: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    duration: true,
                    showOnProfile: true,
                    createdAt: true,
                    updatedAt: true,

                    meetings: {
                        select: {
                            id: true,
                            status: true,
                            attendeeName: true,
                            attendeeEmail: true,
                            additionalInfo: true,
                            meetingDate: true,
                            startTime: true,
                            endTime: true,
                            meetingUrl: true,
                            googleEventId: true,
                            createdAt: true,
                            updatedAt: true,
                        }
                    }
                }
            },

            meetings: {
                select: {
                    id: true,
                    status: true,
                    attendeeName: true,
                    attendeeEmail: true,
                    additionalInfo: true,
                    meetingDate: true,
                    startTime: true,
                    endTime: true,
                    meetingUrl: true,
                    googleEventId: true,
                    createdAt: true,
                    updatedAt: true,
                    event: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            duration: true,
                        }
                    }
                }
            },

            availabilities: {
                select: {
                    id: true,
                    title: true,
                    isdefault: true,
                    timeGap: true,
                    createdAt: true,
                    updatedAt: true,
                    days: {
                        select: {
                            id: true,
                            day: true,
                            startTime: true,
                            endTime: true,
                        }
                    }
                }
            }
        }
    });


    if (!userData) {
        throw new Error("User not found");
    }


    const exportData = {
        exportedAt: new Date().toISOString(),
        user: {
            id: userData.id,
            username: userData.username,
            email: userData.email,
            fullname: userData.fullname,
            profilePic: userData.profilePic,
            about: userData.about,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
            passwordUpdatedAt : userData.passwordUpdatedAt
        },

        events: userData.events,

        meetings: userData.meetings,

        availabilities: userData.availabilities,

        statistics: {
            totalEvents: userData.events.length,
            totalMeetings: userData.meetings.length,
            totalAvailabilities: userData.availabilities.length,
            upcomingMeetings: userData.meetings.filter(m => m.status === 'UPCOMING').length,
            pastMeetings: userData.meetings.filter(m => m.status === 'PAST').length,
            cancelledMeetings: userData.meetings.filter(m => m.status === 'CANCELLED').length,
        }
    };

    return exportData

}

module.exports = { getUser, updateUser, updateUserProfilePic, deleteUser, changeUserPassword, exportUserData}