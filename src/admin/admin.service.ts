import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}
  create(data: CreateAdminDto) {
    return this.prismaService.user.create({ data });
  }

  findUserByEmail(email: string) {
    return this.prismaService.user.findFirst({ where: { email } });
  }

  findSuperAdmin(id: number) {
    return this.prismaService.user.findFirst({ where: { id } });
  }
}
