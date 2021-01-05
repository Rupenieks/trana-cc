import { IsString, MaxLength, IsNotEmpty } from "class-validator";

export class UserAuthDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    password: string;
}