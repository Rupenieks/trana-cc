import { Controller, Request, Post, UseGuards, Get, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { HttpResponse } from './types/HttpResponse';
import { UserAuthDto } from './User/dto/user-auth.dto';

@Controller()
export class AppController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }
  
    @Post('auth/register')
    async registerUser(@Body() userAuthDto: UserAuthDto) : Promise<HttpResponse> {
      
      try {
        await this.authService.register(userAuthDto);

        return {
          success: true,
          msg: 'User registered.'
        }
      } catch (err) {
        return {
          success: false,
          msg: err.message
        }
      }
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}