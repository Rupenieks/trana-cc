import { Module } from '@nestjs/common';
import { UserController } from './User/user.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './User/user.service';
import { UserModule } from './User/user.module';
require('dotenv').config()

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
