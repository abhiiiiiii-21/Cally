import express from "express";
import { PrismaClient } from "@prisma/client";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

// Get all events for the authenticated user
router.get("/", authenticateToken, async (req, res) => {
    try {
        const { search } = req.query;

        const whereClause = {
            userId: req.user.id,
        };

        if (search) {
            whereClause.title = {
                contains: search,
                mode: 'insensitive'
            };
        }

        const events = await prisma.event.findMany({
            where: whereClause,
            orderBy: { createdAt: "desc" },
        });
        const mappedEvents = events.map(event => ({
            ...event,
            showOnProfile: !event.isPrivate
        }));
        res.json(mappedEvents);
    } catch (error) {
        console.error("Get events error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Create a new event
router.post("/", authenticateToken, async (req, res) => {
    try {
        const { title, description, duration, showOnProfile } = req.body;

        if (!title || !duration) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const event = await prisma.event.create({
            data: {
                title,
                description,
                duration: parseInt(duration),
                isPrivate: !showOnProfile, // Mapping showOnProfile to isPrivate (inverse logic or rename field in schema if needed)
                userId: req.user.id,
            },
        });

        res.status(201).json(event);
    } catch (error) {
        console.error("Create event error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update an event
router.put("/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, duration, showOnProfile } = req.body;

        const event = await prisma.event.findUnique({ where: { id } });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.userId !== req.user.id) {
            return res.status(403).json({ message: "Forbidden" });
        }

        const updateData = {};
        if (title) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (duration) updateData.duration = parseInt(duration);
        if (showOnProfile !== undefined) updateData.isPrivate = !showOnProfile;

        const updatedEvent = await prisma.event.update({
            where: { id },
            data: updateData,
        });

        res.json(updatedEvent);
    } catch (error) {
        console.error("Update event error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Delete an event
router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        const event = await prisma.event.findUnique({ where: { id } });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.userId !== req.user.id) {
            return res.status(403).json({ message: "Forbidden" });
        }

        await prisma.event.delete({ where: { id } });

        res.json({ message: "Event deleted" });
    } catch (error) {
        console.error("Delete event error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
