const express = require('express');
const router = express.Router();
const verifyController = require("../controllers/verify");


router.post('/send-code', verifyController.sendCode);
router.post('/verify-code', verifyController.verifyCode);
router.get('/user/:email', verifyController.getUser);


module.exports = router;
