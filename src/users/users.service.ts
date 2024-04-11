import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserAddresDto } from './dto/create-user.dto';
import { UpdateUserAdressDto, UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminService } from 'src/admin/admin.service';
import { Prisma, $Enums } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService extends AdminService {
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService);
  }

  // findUserByEmail(email: string) {
  //   return this.prismaService.user.findFirst({ where: { email } });
  // }
  findAddressByUserIdAndAddressId(userId: number, id: number) {
    return this.prismaService.userAddress.findFirst({ where: { userId, id } });
  }

  deleteAddress(id: number) {
    return this.prismaService.userAddress.delete({ where: { id } });
  }

  getProfileById(id: number) {
    return this.prismaService.userProfile.findFirst({ where: { id } });
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

  findUserByEmail(email: string): Prisma.Prisma__UserClient<
    {
      id: number;
      email: string;
      password: string;
      role: $Enums.Role;
      isActive: boolean;
    },
    null,
    DefaultArgs
  > {
    return this.prismaService.user.findFirst({
      where: { email },
      include: { userProfile: true },
    });
  }

  findUserById(id: number) {
    return this.prismaService.user.findFirst({
      where: { id },
      include: { userProfile: true },
    });
  }

  creatUserProfile(
    userId: number,
    data: {
      nickName: string;
      phone: string;
      birthDate: string;
      gender: 'MALE' | 'FEMALE' | 'AFAB' | 'AMAB' | 'UNSPECIFIED';
    },
  ) {
    return this.prismaService.userProfile.create({
      data: { userId, ...data },
    });
  }

  getAddress(userId: number) {
    return this.prismaService.userAddress.findMany({ where: { userId } });
  }

  createAddress(userId: number, userAddresDto: UserAddresDto) {
    return this.prismaService.userAddress.create({
      data: { userId, ...userAddresDto },
    });
  }

  updateAddres(id: number, data: UpdateUserAdressDto) {
    return this.prismaService.userAddress.update({
      where: { id },
      data,
    });
  }

  getRewards(userId: number) {
    return this.prismaService.reward.findFirst({ where: { userId } });
  }

  createReward(userId: number) {
    return this.prismaService.reward.create({ data: { userId } });
  }

  addReward(userId: number, point: number) {
    return this.prismaService.reward.update({
      where: { userId },
      data: { point: { increment: point } },
    });
  }

  deleteReward(userId: number, point: number) {
    return this.prismaService.reward.update({
      where: { userId },
      data: { point: { decrement: point } },
    });
  }

  getWhitelist(userId: number) {
    return this.prismaService.watchList.findMany({
      where: { userId },
      include: { products: { include: { productImages: true } } },
    });
  }

  addWhitelist(userId: number, productId: number) {
    return this.prismaService.watchList.create({ data: { userId, productId } });
  }

  deleteWhitelist(id: number) {
    return this.prismaService.watchList.delete({ where: { id } });
  }

  findWhiteList(userId: number, productId: number) {
    return this.prismaService.watchList.findFirst({
      where: { userId, productId },
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
