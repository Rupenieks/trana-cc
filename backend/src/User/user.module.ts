import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
require('dotenv').config()

const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoHostname = process.env.MONGO_HOSTNAME;
const mongoPort = process.env.MONGO_PORT;
const mongoDb = process.env.MONGO_DB;




const url = `mongodb://${mongoUser}:${mongoPassword}@${mongoHostname}:${mongoPort}/admin`;

@Module({
	imports: [MongooseModule.forRoot(process.env.MONGO_URL, {
		reconnectInterval: 500,
		user: mongoUser,
		pass: mongoPassword,
	  useNewUrlParser: true,
  }), MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  controllers: [UserController],
  providers: [UserService],
})

export class UserModule {};
