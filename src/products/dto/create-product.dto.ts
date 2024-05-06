import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsString()
    picture: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    stock: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    categoryId: string;

}
