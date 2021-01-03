import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { Document } from 'mongoose';
import { Role } from 'src/auth/enums/role.enum';
import { Note, NoteSchema } from 'src/Note/note.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @IsEmail()
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  admin: boolean;

  @Prop({default: Date.now()})
  createdAt: Date
  
  @Prop({ type: [NoteSchema] })
  notes: Note[];

  @Prop()
  roles: [Role]
}

export const UserSchema = SchemaFactory.createForClass(User);

