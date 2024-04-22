import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(private readonly prismaService: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto) {
      throw new NotFoundException(`User data was not provided`);
    }

    const findUser = await this.prismaService.user.findUnique({ where: { email: createUserDto.email } });

    if (findUser) {
      throw new HttpException(`User with email ${createUserDto.email} already exists`, 409);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 7);
    createUserDto.password = hashedPassword;

    const user = await this.prismaService.user.create({ data: createUserDto });

    return user;
  }

  async findAll() {
    const users = await this.prismaService.user.findMany();
    if (!users) {
      throw new NotFoundException(`Users were not found`);
    }
    return users;
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User was not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User was not found`);
    }
    if (!updateUserDto) {
      throw new NotFoundException(`User data was not provided`);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 7);
    }

    return await this.prismaService.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User was not found`);
    }
    return user;
  }
}
