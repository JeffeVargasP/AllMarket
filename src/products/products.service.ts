import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {

  constructor(private readonly prismaService: PrismaService) { }

  async create(createProductDto: CreateProductDto) {

    const findProduct = await this.prismaService.product.findFirst({ where: { name: createProductDto.name } });

    if (findProduct) {
      throw new NotFoundException(`Product with name ${createProductDto.name} already exists`);
    }

    return await this.prismaService.product.create({ data: createProductDto })

  }

  async findAll() {
    const products = await this.prismaService.product.findMany({
      include: {
        category: true
      }
    });

    if (products.length === 0) {
      throw new NotFoundException(`Products were not found`);
    }
    return products;
  }

  async findOne(id: string) {
    const product = await this.prismaService.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product was not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.prismaService.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product was not found`);
    }

    const mergedData = { ...product, ...updateProductDto };

    Object.keys(mergedData).forEach(key => mergedData[key] === undefined && delete mergedData[key]);

    return await this.prismaService.product.update({ where: { id }, data: mergedData });
  }

  async remove(id: string) {
    const product = await this.prismaService.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product was not found`);
    }

    return await this.prismaService.product.delete({ where: { id } });
  }
}
