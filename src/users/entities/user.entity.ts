import { User } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from 'class-transformer';

export class UserEntity implements User {

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }

    @ApiProperty()
    id: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    name: string;

    @Exclude()
    password: string;

    @ApiProperty()
    role: string;

    @ApiProperty()
    picture: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    carts: any[];

    @ApiProperty()
    orders: any[];

    @ApiProperty()
    reviews: any[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

}