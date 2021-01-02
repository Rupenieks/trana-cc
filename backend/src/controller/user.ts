import { loginUser, registerUser } from "../service/user";
import { UserCredentials } from "../types/UserCredentials";
const { Users } = require('../db/mongo');;

export {};

const express = require('express');
const router = express.Router();


/**
 * @method - POST
 * @param - /login
 * @description - User login
 */
router.post('/login', async (req : any, res : any) => {

    if (req.body === {}) {
        res.status(400);
        res.send({success: false,
                message: 'Empty credentials.'});
    }


    const credentials : UserCredentials = req.body;

    try {
       await loginUser(credentials);

       res.status(200);

       return res.send({success: true,
        msg: 'Succesfull login.'});

    } catch (err) {
        res.status(400);
        return res.send({success: false,
                    msg: err.message})
    }

})

/**
 * @method - POST
 * @param - /register
 * @description - User Registration
 */
router.post('/register', async (req : any, res : any) => {

    if (req.body === {}) {
        res.status(400);
        res.send({success: false,
                message: 'Empty credentials.'});
    }

    const credentials : UserCredentials = req.body;

    try {
       await registerUser(credentials);

       res.status(200);

       return res.send({success: true,
        msg: 'Created new user'});

    } catch (err) {
        res.status(400);
        console.log(err.message);
        return res.send({success: false,
                    msg: err.message})
    }
})


module.exports = router;