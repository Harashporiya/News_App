const express = require("express")
const router = express.Router();

const signupControllers = require("../controllers/user")

router.post("/signup", signupControllers.signup);
router.post("/login", signupControllers.login);
router.put('/:id/password', signupControllers.updatePassword);

module.exports = router