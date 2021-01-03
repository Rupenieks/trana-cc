import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Request, Res, Response } from '@nestjs/common';
import { HttpResponse } from '../types/HttpResponse';
import { AddNoteDto, RemoveNoteDto, UpdateNoteDto } from '../Note/dto/note.dto';
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



  @Post('add-note')
  async addNote(@Body() addNoteDto: AddNoteDto): Promise<HttpResponse> {
    
    try {
        let notes = await this.userService.addNote(addNoteDto);
        
        return {
            success: true,
            msg: 'Note added succesfully.',
            data: notes
        };
    } catch (err) {
        throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: err.message,
          }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('update-note')
  async updateNote(@Body() updateNoteDto: UpdateNoteDto): Promise<HttpResponse> {
    
    try {
        let notes = await this.userService.updateNote(updateNoteDto);
        
        return {
            success: true,
            msg: 'Note udated succesfully.',
            data: notes
        };
    } catch (err) {
        throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: err.message,
          }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('remove-note')
  async removeNote(@Body() removeNoteDto: RemoveNoteDto): Promise<HttpResponse> {
    
    try {
        let notes = await this.userService.removeNote(removeNoteDto);
        
        return {
            success: true,
            msg: 'Note removed succesfully.',
            data: notes
        };
    } catch (err) {
        throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: err.message,
          }, HttpStatus.BAD_REQUEST);
    }
  }
}
