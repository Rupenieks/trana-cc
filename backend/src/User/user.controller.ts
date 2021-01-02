import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Request, Res, Response } from '@nestjs/common';
import { AppService } from '../app.service';
import { HttpResponse } from '../types/HttpResponse';
import { UserAuthDto } from './dto/user-auth.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body() userAuthDto: UserAuthDto): Promise<HttpResponse> {
    
    try {
        await this.userService.register(userAuthDto);
        
        return {
            success: true,
            msg: 'Registered succesfully.'
        };
    } catch (err) {
        throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: err.message,
          }, HttpStatus.BAD_REQUEST);
    }

  }

  @Post('login')
  async loginUser(@Body() userAuthDto: UserAuthDto): Promise<HttpResponse> {
    try {
        await this.userService.login(userAuthDto);
        
        return {
            success: true,
            msg: 'Logged in succesfully.'
        };
    } catch (err) {
        throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: err.message,
          }, HttpStatus.BAD_REQUEST);
    }
  }
}
