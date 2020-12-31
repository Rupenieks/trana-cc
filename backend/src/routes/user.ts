export {};

const express = require('express');
const router = express.Router();

const User = require("../db/models/User");

/**
 * @method - POST
 * @param - /login
 * @description - User login
 */
router.post('/login', async (req : any, res : any) => {

    const {
        email,
        password
    } = req.body;

    try {
        let user = await User.findOne({
            email, password
        });

        if (user) {
            return res.status(200).json({
                msg: "User found.",
                success: true
            });
        }
    } catch (err) {

    }
    console.log("Login received.");

})

module.exports = router;