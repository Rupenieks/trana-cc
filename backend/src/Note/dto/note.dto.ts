import { IsString, MaxLength, IsNotEmpty } from "class-validator";

export class AddNoteDto {
    @IsString()
    @MaxLength(15)
    @IsNotEmpty()
    title: string;

    content: string;

    @IsString()
    @IsNotEmpty()
    email: string;
}

export class UpdateNoteDto {
    @IsString()
    @MaxLength(15)
    @IsNotEmpty()
    title: string;

    content: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    id: string
}

export class RemoveNoteDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    id: string
}