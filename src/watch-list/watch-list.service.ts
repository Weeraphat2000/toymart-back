import { Injectable } from '@nestjs/common';
import { CreateWatchListDto } from './dto/create-watch-list.dto';
import { UpdateWatchListDto } from './dto/update-watch-list.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WatchListService {
  constructor(private readonly prismaService: PrismaService) {}

  findAllByUserId(userId: number) {
    return this.prismaService.watchList.findMany({
      where: { userId },
      include: { products: { include: { productCover: true } } },
    });
  }

  findProductByUserIdAndProductId(userId: number, productId: number) {
    return this.prismaService.watchList.findFirst({
      where: { userId, productId },
    });
  }

  cteateWatchList(userId: number, productId: number) {
    return this.prismaService.watchList.create({ data: { userId, productId } });
  }

  deleteWatchList(id: number) {
    return this.prismaService.watchList.delete({ where: { id } });
  }
}
