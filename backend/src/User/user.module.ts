import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';
require('dotenv').config()

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    "user": process.env.MONGO_USER,
    "pass": process.env.MONGO_PASSWORD
  }), MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
