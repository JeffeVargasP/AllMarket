import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {

  constructor(private readonly prismaService: PrismaService) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const findCategory = await this.prismaService.category.findFirst({ where: { name: createCategoryDto.name } });

    if (findCategory) {
      throw new NotFoundException(`Category with name ${createCategoryDto.name} already exists`);
    }

    return await this.prismaService.category.create({ data: createCategoryDto })
  }

  async findAll() {
    const categories = await this.prismaService.category.findMany();

    if (categories.length === 0) {
      throw new NotFoundException(`Categories were not found`);
    }

    return categories;
  }

  async findOne(id: string) {
    const category = await this.prismaService.category.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category was not found`);
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prismaService.category.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category was not found`);
    }

    const mergedData = { ...category, ...updateCategoryDto };

    Object.keys(mergedData).forEach(key => mergedData[key] === undefined && delete mergedData[key]);

    return await this.prismaService.category.update({ where: { id }, data: mergedData });

  }

  async remove(id: string) {
    const category = await this.prismaService.category.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category was not found`);
    }

    return await this.prismaService.category.delete({ where: { id } });
  }
}
