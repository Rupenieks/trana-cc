import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/auth/enums/role.enum';
import { Note } from 'src/Note/note.schema';
import { AddNoteDto, GetNotesByIdDto, RemoveNoteDto, UpdateNoteDto } from '../Note/dto/note.dto';
import { UserAuthDto } from './dto/user-auth.dto';
import { User, UserDocument } from './user.schema';
const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async findOneById(id: string) {
		return await this.userModel.findOne({_id: id});
	}

	async findOneByEmail(email: string) {
		return await this.userModel.findOne({email: email});
	}
	
	async create(userAuthDto: UserAuthDto) {
		const newUser = new this.userModel(userAuthDto);

		try {
			let hashedPassword = await bcrypt.hash(userAuthDto.password, BCRYPT_SALT_ROUNDS);
			
			newUser.password = hashedPassword;
			newUser.notes = [];
			newUser.admin = false;
			newUser.roles = [Role.User];

			newUser.save();
			
		} catch (err) {
			throw new Error('Failed to create new user. Please try again.');
		}

		return newUser;
	}
	

	async login(userAuthDto: UserAuthDto): Promise<User> {

		try {
			let user = await this.findOneByEmail(userAuthDto.email);

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

	async getAllUsers(): Promise<User[]> {

		try {
			let users = await this.userModel.find();
			return users;

		} catch (err) {
			throw err;
		}
	}

	async getNotesById(getNotesByIdDto: GetNotesByIdDto): Promise<Note[]> {

		try {
			let user = await this.findOneById(getNotesByIdDto.id);

			if (!user) {
				throw new Error('User not found.')
			}

			const notes = user.notes;

			return notes;

		} catch (err) {
			throw err;
		}
	}

	async addNote(addNoteDto: AddNoteDto): Promise<Note[]> {
		try {
		
			let user = await this.findOneById(addNoteDto.id);

			if (!user) {
				throw new Error('Could not find user.');
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
				_id: updateNoteDto.id,
				'notes._id' : updateNoteDto.noteId},
				{"notes.$.title" : updateNoteDto.title,
				"notes.$.content" : updateNoteDto.content},
			{new : true},
			(err) => {
				if (err) {
					throw new Error('Could not update note. Please try again.');
				}
			});

			const notes = user.notes;

			return notes;

		} catch (err) { 
			throw err;
		}
	}

	async removeNote(removeNoteDto: RemoveNoteDto): Promise<Note[]> {
		try {
			let user = await this.userModel.findOne({
				_id: removeNoteDto.id}, (err, user) => {
					if (err) {
						throw new Error('Not found.');
					}

					user.notes.pull(removeNoteDto.noteId);
					return user.save();
				});

				const notes = user.notes;

				return notes;
		} catch (err) { 
			throw err;
		}
	}
}

