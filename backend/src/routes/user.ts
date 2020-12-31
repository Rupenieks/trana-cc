export {};

const express = require('express');
const router = express.Router();

const User = require("../db/models/User");

/**
 * @method - POST
 * @param - /login
 * @description - User login
 */
router.post('/login', (req: any, res: any) => {
    console.log("Login received.");
})

module.exports = router;