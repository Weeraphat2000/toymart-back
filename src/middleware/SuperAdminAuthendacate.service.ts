import { Injectable, NestMiddleware } from '@nestjs/common';
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
    const token = req.headers.authorization.split(' ')[1];
    const playload = this.authService.verify(token);
    const superAdmin = await this.adminService.findSuperAdmin(playload.userId);
    delete superAdmin.password;
    req.body = superAdmin;
    next();
  }
}
