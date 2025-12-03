import express from "express";
import { PrismaClient } from "@prisma/client";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

// Get bookings for the authenticated user
router.get("/", authenticateToken, async (req, res) => {
    try {
        const { type } = req.query; // 'upcoming' or 'past'
        const now = new Date();

        const whereClause = {
            OR: [
                { userId: req.user.id }, // User is the host
                { email: req.user.email } // User is the guest (if we track guest emails in user table, but here we rely on Booking.email)
            ]
        };



        const whereClauseHost = {
            event: {
                userId: req.user.id
            }
        };

        if (type === "upcoming") {
            whereClauseHost.startTime = {
                gte: now
            };
        } else if (type === "past") {
            whereClauseHost.startTime = {
                lt: now
            };
        }

        const bookings = await prisma.booking.findMany({
            where: whereClauseHost,
            include: {
                event: {
                    select: {
                        title: true
                    }
                }
            },
            orderBy: {
                startTime: type === "upcoming" ? "asc" : "desc"
            }
        });

        const mappedBookings = bookings.map(booking => ({
            id: booking.id,
            name: booking.name,
            email: booking.email,
            date: booking.startTime.toISOString().split('T')[0], // Just date part or full date? Frontend shows Date.
            slotBooked: `${booking.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${booking.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
            meetingUrl: booking.meetLink,
            title: booking.event.title // Optional, maybe useful
        }));

        res.json(mappedBookings);
    } catch (error) {
        console.error("Get bookings error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
