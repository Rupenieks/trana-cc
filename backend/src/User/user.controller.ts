import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Request, Res, Response, SetMetadata } from '@nestjs/common';
import { HttpResponse } from '../types/HttpResponse';
import { AddNoteDto, GetNotesById, RemoveNoteDto, UpdateNoteDto } from '../Note/dto/note.dto';
import { UserAuthDto } from './dto/user-auth.dto';
import { UserService } from './user.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body() userAuthDto: UserAuthDto): Promise<HttpResponse> {
    
    try {
        const user = await this.userService.register(userAuthDto);
        
        return {
            success: true,
            msg: 'Registered succesfully.',
            data: user
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
        const user = await this.userService.login(userAuthDto);
        
        return {
            success: true,
            msg: 'Logged in succesfully.',
            data: user
        };
    } catch (err) {
        throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: err.message,
          }, HttpStatus.BAD_REQUEST);
    }
  }

 
  @Get('get-all')
  async getAllUsers(@Body() userAuthDto: UserAuthDto): Promise<HttpResponse> {
    try {
        let users = await this.userService.getAllUsers(userAuthDto);
        
        return {
            success: true,
            msg: 'Fetched users succesfully.',
            data: users
        };
    } catch (err) {
        throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            error: err.message,
          }, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('get-notes-by-id')
  async getNotesById(@Body() getNotesByEmailDto: GetNotesById): Promise<HttpResponse> {
    
    try {
        const notes = await this.userService.getNotesById(getNotesByEmailDto);
        
        return {
            success: true,
            msg: 'Notes retrieved succesfully.',
            data: notes
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
        const notes = await this.userService.addNote(addNoteDto);
        
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
        const notes = await this.userService.updateNote(updateNoteDto);
        
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
        const notes = await this.userService.removeNote(removeNoteDto);
        
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
