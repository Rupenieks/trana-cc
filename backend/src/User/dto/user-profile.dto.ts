import { IsString, MaxLength, IsNotEmpty } from "class-validator";

export class UserProfileDto {
    @IsString()
    @IsNotEmpty()
    id: string;
}