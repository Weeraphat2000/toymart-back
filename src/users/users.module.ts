import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BcryptService } from 'src/service/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/service/authService.service';
import { Authenticate } from 'src/middleware/authendicate.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, BcryptService, AuthService],
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: 'a', // กำหนดค่า SECRET_KEY ที่นี่
      // signOptions: { expiresIn: '1h' }, // ตั้งค่าอื่น ๆ ตามต้องการ
    }),
  ],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Authenticate).forRoutes(
      { path: '/users', method: RequestMethod.GET },
      { path: '/users/profile', method: RequestMethod.GET },
      { path: '/users/create-address/', method: RequestMethod.GET },
      { path: '/users/allAddress/', method: RequestMethod.GET },
      {
        path: '/users/delete-address/:addressId',
        method: RequestMethod.DELETE,
      },
    );
  }
}
