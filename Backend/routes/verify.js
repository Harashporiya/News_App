const express = require('express');
const router = express.Router();
const verifyController = require("../controllers/verify");
const userData = require("../middlewares/isLoggedIn")

router.post('/send-code', verifyController.sendCode);
router.post('/verify-code', verifyController.verifyCode);
router.get('/user/:email', verifyController.getUser);
router.get("/data", userData.isLogged)

module.exports = router;
