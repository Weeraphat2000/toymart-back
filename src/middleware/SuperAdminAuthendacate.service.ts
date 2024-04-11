import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import e from 'express';
import { AdminService } from 'src/admin/admin.service';
import { AuthService } from 'src/service/authService.service';

@Injectable()
export class SuperAdminAuthendacate implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly adminService: AdminService,
  ) {}
  async use(
    req: { headers: { authorization: string }; body: {} },
    res: any,
    next: (error?: any) => void,
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const playload = this.authService.verify(token);
      const superAdmin = await this.adminService.findUserById(playload.userId);
      delete superAdmin.password;
      if (superAdmin.role == 'USER') {
        throw new NotFoundException('ไม่ได้รับอณุญาติ');
      }
      req.body = superAdmin;
      next();
    } catch (error) {
      if (error?.response?.statusCode == 404) {
        throw new NotFoundException(error.response.message);
      }
      throw new NotFoundException('token invalid');
    }
  }
}
