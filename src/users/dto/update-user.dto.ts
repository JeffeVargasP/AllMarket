import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserDto {

    @ApiProperty()
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    confirmPassword: string;

    @ApiProperty()
    @IsOptional()
    phone: string;

    @ApiProperty()
    @IsOptional()
    address: string;

    @ApiProperty()
    @IsOptional()
    email: string;

    @ApiProperty()
    @IsOptional()
    picture: string;

}
