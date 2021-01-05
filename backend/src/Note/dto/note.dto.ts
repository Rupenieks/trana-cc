import { IsString, MaxLength, IsNotEmpty } from "class-validator";

export class AddNoteDto {
    @IsString()
    @MaxLength(15)
    @IsNotEmpty()
    title: string;

    @IsString()
    content: string;

    @IsString()
    @IsNotEmpty()
    id: string;
}

export class UpdateNoteDto {
    @IsString()
    @MaxLength(15)
    @IsNotEmpty()
    title: string;

    content: string;

    @IsString()
    @IsNotEmpty()
    id: string;

    noteId: string
}

export class RemoveNoteDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    noteId: string
}

export class GetNotesByIdDto {
    @IsString()
    @IsNotEmpty()
    id: string;
}