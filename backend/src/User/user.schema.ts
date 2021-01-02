import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { Document } from 'mongoose';

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
  
  @Prop(raw({
    title: { type: String },
    content: { type: String }
  }))
  notes: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);