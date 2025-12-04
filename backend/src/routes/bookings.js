import express from "express";
import { PrismaClient } from "@prisma/client";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

// Get bookings for the authenticated user
router.get("/", authenticateToken, async (req, res) => {
    try {
        const { type, page = 1, limit = 10, filter } = req.query; // 'upcoming' or 'past'
        const now = new Date();

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

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
        } else if (type === "cancelled") {
            return res.json({
                data: [],
                meta: {
                    total: 0,
                    page: pageNum,
                    limit: limitNum,
                    totalPages: 0
                }
            });
        }

        if (filter && filter !== "all") {
            // Filter format: "YYYY-MM"
            const [year, month] = filter.split("-").map(Number);
            if (year && month) {
                const startDate = new Date(year, month - 1, 1);
                const endDate = new Date(year, month, 0, 23, 59, 59);

                // Ensure we respect the type constraint
                if (type === "upcoming") {
                    // For upcoming, we want meetings in this month that are >= now
                    // But if the month is in future, we take all.
                    // If month is current month, we take >= now.
                    // If month is past, we take nothing (because type=upcoming).

                    // Actually, let's just intersect the ranges.
                    // Base range: >= now
                    // Filter range: startDate to endDate

                    // Final start = max(now, startDate)
                    // Final end = endDate

                    const finalStart = new Date(Math.max(now.getTime(), startDate.getTime()));

                    if (finalStart <= endDate) {
                        whereClauseHost.startTime = {
                            gte: finalStart,
                            lte: endDate
                        };
                    } else {
                        // No overlap
                        return res.json({ data: [], meta: { total: 0, page: 1, limit: limitNum, totalPages: 0 } });
                    }
                } else if (type === "past") {
                    // Base range: < now
                    // Filter range: startDate to endDate

                    // Final start = startDate
                    // Final end = min(now, endDate)

                    const finalEnd = new Date(Math.min(now.getTime(), endDate.getTime()));

                    if (startDate <= finalEnd) {
                        whereClauseHost.startTime = {
                            gte: startDate,
                            lt: finalEnd // Use lt because base is lt now
                        };
                    } else {
                        // No overlap
                        return res.json({ data: [], meta: { total: 0, page: 1, limit: limitNum, totalPages: 0 } });
                    }
                }
            }
        }

        const [bookings, total] = await Promise.all([
            prisma.booking.findMany({
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
                },
                skip: skip,
                take: limitNum
            }),
            prisma.booking.count({
                where: whereClauseHost
            })
        ]);

        const mappedBookings = bookings.map(booking => ({
            id: booking.id,
            name: booking.name,
            email: booking.email,
            date: booking.startTime.toISOString().split('T')[0],
            slotBooked: `${booking.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${booking.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
            meetingUrl: booking.meetLink,
            title: booking.event.title
        }));

        res.json({
            data: mappedBookings,
            meta: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum)
            }
        });
    } catch (error) {
        console.error("Get bookings error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
