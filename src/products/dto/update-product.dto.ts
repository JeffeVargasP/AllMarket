import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsOptional } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    @ApiProperty()
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsOptional()
    description: string;

    @ApiProperty()
    @IsOptional()
    price: number;

    @ApiProperty()
    @IsOptional()
    picture: string;

    @ApiProperty()
    @IsOptional()
    stock: number;

    @ApiProperty()
    @IsOptional()
    categoryId: string;

}
