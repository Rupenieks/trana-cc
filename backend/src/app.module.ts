import { Module } from '@nestjs/common';
import { UserModule } from './User/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
require('dotenv').config()

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController],
  providers: [    {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },],
})
export class AppModule {}
