import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class UpdateUserDto {

    @ApiProperty()
    name?: string;

    @ApiProperty()
    password?: string;

    @ApiProperty()
    phone?: string;

    @ApiProperty()
    address?: string;

    @Exclude()
    email?: string;

    @ApiProperty()
    picture?: string;

}
