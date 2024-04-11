import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Gender, Role } from '@prisma/client';

export interface CustomRequest extends Request {
  user?: {
    id: number;
    email: string;
    password: string;
    role: Role;
    isActive: boolean;
    userProfile: {
      id: number;
      nickName: string;
      phone: string;
      birthDate: Date; // *********
      gender: Gender;
      userId: number;
    };
  }; // เพิ่ม property 'user' ใน Request
}

@Injectable()
export class Authenticate implements NestMiddleware {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: CustomRequest, res: Response, next: (error?: any) => void) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const payload = await this.jwtService.verify(token);
      const user = await this.userService.findUserById(payload.userId);
      //   console.log(user, 'authen middleware');

      delete user.password;
      req.user = user;
      next();
      return;
    } catch (error) {
      throw new NotFoundException('token is wrong');
    }
  }
}
