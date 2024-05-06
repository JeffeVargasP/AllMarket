import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(private readonly prismaService: PrismaService) { }

  async create(createUserDto: CreateUserDto) {

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

    if (updateUserDto.confirmPassword && updateUserDto.password === updateUserDto.confirmPassword) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 7);
      updateUserDto = { ...updateUserDto, confirmPassword: undefined };

      const mergedData = { ...user, ...updateUserDto };

      Object.keys(mergedData).forEach(key => mergedData[key] === undefined && delete mergedData[key]);

      return await this.prismaService.user.update({ where: { id }, data: mergedData });

    } else {
      throw new HttpException(`Passwords do not match`, 400);
    }

  }

  async remove(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User was not found`);
    }
    return this.prismaService.user.delete({ where: { id } });
  }
}
