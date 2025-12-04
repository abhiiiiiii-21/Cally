import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDateWithinMonths(months, direction = "past") {
    const date = new Date();

    const days = randomInt(1, months * 30);

    if (direction === "past") {
        date.setDate(date.getDate() - days);
    } else {
        date.setDate(date.getDate() + days);
    }

    // Random hour between 8 AM - 8 PM
    date.setHours(randomInt(8, 20), randomInt(0, 59), 0, 0);

    return date;
}

function randomMeetLink() {
    const code = Math.random().toString(36).substring(2, 12);
    return `https://meet.google.com/${code}`;
}

function randomGuestName() {
    const firstNames = ["Arjun", "Riya", "Kabir", "Sana", "Ishaan", "Mira", "Aarav", "Diya", "Kunal", "Tara"];
    const lastNames = ["Sharma", "Patel", "Verma", "Singh", "Nair", "Reddy", "Kapoor", "Mehta"];

    return `${firstNames[randomInt(0, firstNames.length - 1)]} ${lastNames[randomInt(0, lastNames.length - 1)]
        }`;
}

function randomEventTitle() {
    const titles = [
        "Intro Call",
        "Product Demo",
        "30-Min Strategy Session",
        "Consultation",
        "Interview",
        "1:1 Meeting",
        "Design Review",
    ];

    return titles[randomInt(0, titles.length - 1)];
}

async function main() {
    console.log("Seeding bookings...");

    const user = await prisma.user.findFirst();

    if (!user) {
        console.log("No user found. Please create a user first.");
        return;
    }

    console.log(`Seeding for user: ${user.username} (${user.id})`);

    // Clear existing bookings
    await prisma.booking.deleteMany({
        where: { userId: user.id }
    });
    console.log("Cleared existing bookings");

    // Create a random event
    let event = await prisma.event.findFirst({
        where: { userId: user.id }
    });

    if (!event) {
        event = await prisma.event.create({
            data: {
                title: randomEventTitle(),
                duration: randomInt(15, 60),
                userId: user.id,
                description: "Auto-generated event"
            }
        });
        console.log("Created random event");
    }

    // Generate Past Bookings (last 6 months)
    const pastBookings = [];
    for (let i = 1; i <= 25; i++) {
        const startTime = randomDateWithinMonths(6, "past");
        const duration = randomInt(15, 60);
        const endTime = new Date(startTime.getTime() + duration * 60000);

        const name = randomGuestName();

        pastBookings.push({
            eventId: event.id,
            userId: user.id,
            name,
            email: `${name.toLowerCase().replace(" ", ".")}@example.com`,
            startTime,
            endTime,
            meetLink: randomMeetLink(),
            googleEventId: `past-${i}-${Date.now()}`
        });
    }

    // Generate Future Bookings (next 6 months)
    const futureBookings = [];
    for (let i = 1; i <= 25; i++) {
        const startTime = randomDateWithinMonths(6, "future");
        const duration = randomInt(15, 60);
        const endTime = new Date(startTime.getTime() + duration * 60000);

        const name = randomGuestName();

        futureBookings.push({
            eventId: event.id,
            userId: user.id,
            name,
            email: `${name.toLowerCase().replace(" ", ".")}@example.com`,
            startTime,
            endTime,
            meetLink: randomMeetLink(),
            googleEventId: `future-${i}-${Date.now()}`
        });
    }

    await prisma.booking.createMany({
        data: [...pastBookings, ...futureBookings]
    });

    console.log(`Seeded ${pastBookings.length} varied past and ${futureBookings.length} diverse future bookings.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
