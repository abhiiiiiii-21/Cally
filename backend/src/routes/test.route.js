const router = require('express').Router();
const { authMiddleware } = require('../middlewares/auth.middleware')

router.get("/protected", authMiddleware, (req, res) => {
    res.json({
        message: "Access granted",
        user: req.user,
    });
});

module.exports = router;