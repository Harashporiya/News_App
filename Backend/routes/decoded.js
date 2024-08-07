const express = require('express');
const router = express.Router();
const userData = require("../middlewares/isLoggedIn");

router.get("/data", userData.isLogged, async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;
