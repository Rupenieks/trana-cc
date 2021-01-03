import { Module } from '@nestjs/common';
import { UserModule } from './User/user.module';
require('dotenv').config()

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
