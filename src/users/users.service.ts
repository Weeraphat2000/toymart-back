import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  findUserByEmail(email: string) {
    return this.prismaService.user.findFirst({ where: { email } });
  }

  creatTableUser(data: {
    email: string;
    password: string;
    role: 'USER' | 'ADMIN' | 'SUPERADMIN';
  }) {
    return this.prismaService.user.create({ data: data });
  }

  createUser(createUserDto: CreateUserDto, id: number) {
    return this.prismaService.userAddress.create({
      data: { ...createUserDto, userId: id },
    });
  }

  findUser(id: number) {
    return this.prismaService.user.findFirst({
      where: { id },
      include: { userAddresses: true },
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
