import { userInfo } from "os";
import { User } from "../types/User";
import { UserCredentials } from "../types/UserCredentials";
const mongoDb = require('../db/mongo');
const User = require("../db/models/User");
const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 10;


export async function registerUser(credentials : UserCredentials) : Promise<User> {
    let newUser : User;

    try {
        let user = await User.findOne({ email: credentials.email});

        if (user) {
            console.log('User already exists.')
            throw new Error('User with email address already exists.');
        }

    } catch (err) {
        throw err;
    }

    try {
        let hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_SALT_ROUNDS);
        
        newUser = await User.create({
            email: credentials.email,
            password: hashedPassword,
            admin: false,
            notes: []
        });
        
    } catch (err) {
        console.log(err);
        throw new Error('Failed to create new user. Please try again.');
    }

    return newUser;
}

export async function loginUser(credentials : UserCredentials) : Promise<User> {

    try {
        let user = await User.findOne({email: credentials.email});

        if (!user) {
            throw new Error('User with given email address not found.');
        }

        if (!await bcrypt.compare(credentials.password, user.password)) {
            throw new Error('Incorrect password.');
        }

        return user;

    } catch (err) { 
        throw err;
    }
}