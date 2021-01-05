import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, Request, Res, Response, SetMetadata, UseGuards } from '@nestjs/common';
import { HttpResponse } from '../types/HttpResponse';
import { AddNoteDto, GetNotesByIdDto, RemoveNoteDto, UpdateNoteDto } from '../Note/dto/note.dto';
import { UserAuthDto } from './dto/user-auth.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  

  @Roles(Role.Admin)
  @Get('get-all')
  async getAllUsers(@Body() userAuthDto: UserAuthDto): Promise<HttpResponse> {
    
    try {
        let users = await this.userService.getAllUsers();
        
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

  @Roles(Role.User)
  @Post('get-notes-by-id')
  async getNotesById(@Body() getNotesByIdDto: GetNotesByIdDto): Promise<HttpResponse> {
    
    try {
        const notes = await this.userService.getNotesById(getNotesByIdDto);
        
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

  @Roles(Role.User)
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

  @Roles(Role.User)
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

  @Roles(Role.User)
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
