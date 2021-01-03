import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from 'src/Note/note.schema';
import { AddNoteDto, RemoveNoteDto, UpdateNoteDto } from '../Note/dto/note.dto';
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
        let user = await this.userModel.findOne({ email: userAuthDto.email })
        
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

  async addNote(addNoteDto: AddNoteDto): Promise<Note[]> {

    try {
        let user = await this.userModel.findOne({email: addNoteDto.email});

        if (!user) {
            throw new Error('Could not find user note belongs to.');
        }

        let note = {
            title: addNoteDto.title,
            content: addNoteDto.content
        };

        user.notes.push(note);

        user.save();

        const updatedNotes = user.notes;

        return updatedNotes;

    } catch (err) { 
        throw err;
    }
  }

  async updateNote(updateNoteDto: UpdateNoteDto): Promise<Note[]> {

    try {
        let user = await this.userModel.findOneAndUpdate({
            email: updateNoteDto.email,
            'notes._id' : updateNoteDto.id},
            {"notes.$.title" : updateNoteDto.title,
            "notes.$.content" : updateNoteDto.content},
          {new : true},
         (err) => {
              if (err) {
                throw new Error('Could not update note. Please try again.');
              }
          });

        return user.notes;

    } catch (err) { 
        throw err;
    }
  }

  async removeNote(removeNoteDto: RemoveNoteDto): Promise<Note[]> {

    try {
        let user = await this.userModel.findOne({
            email: removeNoteDto.email}, (err, user) => {
                if (err) {
                    throw new Error('Not found.');
                }

                user.notes.pull(removeNoteDto.id);
                return user.save();
            });

        return user.notes;
    } catch (err) { 
        throw err;
    }
  }
}

