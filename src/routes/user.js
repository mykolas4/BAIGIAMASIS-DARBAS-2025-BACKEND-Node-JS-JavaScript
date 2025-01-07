const express = require('express');


const { REGISTER, LOGIN } = require('../controllers/user.js');

const router = express.Router();

router.post("/register", REGISTER);
router.post("/login", LOGIN);

module.exports = router;
