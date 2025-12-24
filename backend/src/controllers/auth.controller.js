const {signup} = require("../services/auth.service");

const signupController = async (req, res) => {
    try {
        await signup(req.body);
        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        console.log("Error in signupController:", error);
        res.status(400).json({ error: error.message });
    }
}

module.exports = { signupController };