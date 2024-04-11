import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createProductDto: CreateProductDto) {
    // return this.prismaService.pr
    return 'ยังไม่ได้ทำเลยจ้ะ';
  }

  getProductByProductId(id: number) {
    return this.prismaService.products.findFirst({
      where: { id },
      include: {
        productSeries: true,
        productGroup: true,
        productCover: true,
        productImages: true,
        productPosters: true,
      },
    });
  }

  getAllProduct() {
    return this.prismaService.products.findMany({
      include: {
        productSeries: true,
        productGroup: true,
        productCover: true,
        productImages: true,
        productPosters: true,
      },
    });
  }

  findAll() {
    return this.prismaService.productGroup.findMany();
  }

  findAllByUserId(userId: number) {
    return this.prismaService.products.findMany({
      include: { watchList: { where: { userId } }, productImages: true },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
