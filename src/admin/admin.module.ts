import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SuperAdminAuthendacate } from 'src/middleware/SuperAdminAuthendacate.service';
import { BcryptService } from 'src/service/bcrypt.service';
import { AuthService } from 'src/service/authService.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService, BcryptService, AuthService],
  imports: [
    UsersModule,
    PrismaModule,
    JwtModule.register({
      secret: 'a', // กำหนดค่า SECRET_KEY ที่นี่
      // signOptions: { expiresIn: '1h' }, // ตั้งค่าอื่น ๆ ตามต้องการ
    }),
  ],
})
export class AdminModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SuperAdminAuthendacate).forRoutes(
      {
        path: 'admin/superAdmin-auto-login',
        method: RequestMethod.POST,
      },
      { path: 'admin/admin-auto-login', method: RequestMethod.POST },
      { path: 'admin/register', method: RequestMethod.POST },
      { path: 'admin/all-user', method: RequestMethod.GET },
      { path: 'admin/all-admin', method: RequestMethod.GET },
    );
  }
}
