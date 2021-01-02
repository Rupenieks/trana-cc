import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAuthDto } from './dto/user-auth.dto';
import { User, UserDocument } from './user.schema';
const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}


  async register(userAuthDto: UserAuthDto): Promise<User> {
    const newUser = new this.userModel(userAuthDto);

    try {
        let user = await this.userModel.findOne({ email: userAuthDto.email})
        
        if (user) {
            console.log('User already exists.')
            throw new Error('User with email address already exists.');
        }

    } catch (err) {
        throw err;
    }

    try {
        let hashedPassword = await bcrypt.hash(userAuthDto.password, BCRYPT_SALT_ROUNDS);
        
        newUser.password = hashedPassword;
        newUser.notes = [];
        newUser.admin = false;


        newUser.save();
        
    } catch (err) {
        console.log(err);
        throw new Error('Failed to create new user. Please try again.');
    }

    return newUser;
  }

  async login(userAuthDto: UserAuthDto): Promise<User> {

    try {
        let user = await this.userModel.findOne({email: userAuthDto.email});

        if (!user) {
            throw new Error('User with given email address not found.');
        }

        if (!await bcrypt.compare(userAuthDto.password, user.password)) {
            throw new Error('Incorrect password.');
        }

        return user;

    } catch (err) { 
        throw err;
    }
  }
}

