import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(protected readonly prismaService: PrismaService) {}
  create(data: CreateAdminDto) {
    return this.prismaService.user.create({ data });
  }

  findUserByEmail(email: string) {
    return this.prismaService.user.findFirst({
      where: { email },
    });
  }

  findUserById(id: number) {
    return this.prismaService.user.findFirst({ where: { id } });
  }

  addminLogin(email: string) {
    return this.prismaService.user.findFirst({
      where: { email },
      include: { userProfile: true },
    });
  }

  getAllUser() {
    return this.prismaService.user.findMany({
      where: { role: 'USER' },
      include: { userProfile: true },
    });
  }

  getAllAdmin() {
    return this.prismaService.user.findMany({
      where: { role: 'ADMIN' },
    });
  }

  banUserByUserId(id: number, ban: boolean) {
    return this.prismaService.user.update({
      where: { id },
      data: { isActive: ban },
    });
  }
}
