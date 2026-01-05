const { signup, login } = require("../services/auth.service");

const signupController = async (req, res) => {
    try {
        const data = await signup(req.body);
        res.status(201).json(data);

    } catch (error) {
        console.log("Error in signupController:", error);
        res.status(400).json({ error: error.message });
    }
}

const loginController = async (req, res) => {
    try {
        const data = await login(req.body)
        res.status(201).json(data);
    } catch (error) {
        console.log("Error in loginController:", error);
        res.status(400).json({ error: error.message });
    }
}

module.exports = { signupController, loginController };