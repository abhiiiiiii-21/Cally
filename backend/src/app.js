const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth.route');
const eventRoutes = require('./routes/event.route')
const userRoutes = require('./routes/user.route')

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/user", userRoutes)



module.exports = app;