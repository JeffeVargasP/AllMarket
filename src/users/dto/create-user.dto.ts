import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    @IsString()
    name?: string = "User";

    @ApiProperty()
    @IsString()
    @IsStrongPassword()
    @MinLength(8)
    password: string;

    @ApiProperty()
    @IsString()
    @IsPhoneNumber()
    phone?: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address?: string;

    @ApiProperty()
    @IsEmail()
    email: string;

}
