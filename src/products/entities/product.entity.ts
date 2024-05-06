import { ApiProperty } from "@nestjs/swagger";
import { Product } from "@prisma/client";

export class ProductEntity implements Product {

    constructor(partial: Partial<ProductEntity>) {
        Object.assign(this, partial);
    }

    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    picture: string;

    @ApiProperty()
    stock: number;

    @ApiProperty()
    categoryId: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;


}
