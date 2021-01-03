import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../User/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserService } from 'src/User/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/User/user.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './contants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),],
  providers: [AuthService, LocalStrategy, UserService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
