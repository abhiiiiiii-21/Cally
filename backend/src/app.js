const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth.route');

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(express.json());


app.get("/test", (req, res) => {
  console.log("TEST ROUTE HIT");
  res.json({ ok: true });
});

app.use("/api/auth", authRoutes);



module.exports = app;