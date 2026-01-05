const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
    const auth = req.headers.authorization

    if (!auth) {
        return res.status(401).json({ "error": "Authorization header missing!" })
    }

    const token = auth.split(" ")[1]

    if (!token) {
        return res.status(401).json({ "error": "Token missing!" })
    }

    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET)

        req.user = verify

        next()
    } catch (error) {
        return res.status(403).json({ "error": "Invalid or expired token!" })
    }


}

module.exports = { authMiddleware }