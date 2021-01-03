import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAuthDto } from 'src/User/dto/user-auth.dto';
import { User } from 'src/User/user.schema';
import { UserService } from 'src/User/user.service';
const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService) {}

	async validateUser(email : string, password: string): Promise<User> {
		const user = await this.userService.findOneByEmail(email);

		if (!await bcrypt.compare(password, user.password)) {
			throw new Error('Incorrect password.');
		}

		return user;
	}

	async login(userAuthDto : UserAuthDto) {
		const user = await this.userService.findOneByEmail(userAuthDto.email);

		const payload = { username: user.email, sub: user._id };
		
		return {
			data: user,
		  	access_token: this.jwtService.sign(payload),
		};
	  }
}
