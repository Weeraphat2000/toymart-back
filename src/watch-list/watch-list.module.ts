import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { WatchListService } from './watch-list.service';
import { WatchListController } from './watch-list.controller';
import { Authenticate } from 'src/middleware/authendicate.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [WatchListController],
  providers: [WatchListService],
  imports: [
    PrismaModule,
    UsersModule,
    JwtModule.register({
      secret: 'a', // กำหนดค่า SECRET_KEY ที่นี่
      // signOptions: { expiresIn: '1h' }, // ตั้งค่าอื่น ๆ ตามต้องการ
    }),
  ],
})
export class WatchListModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Authenticate) // ต้อง import usersModule เข้ามาด้วยเพราะว่า Authenticate ใช้
      .forRoutes(
        { path: '/watch-list', method: RequestMethod.GET },
        { path: '/watch-list/:productId', method: RequestMethod.PATCH },
      );
  }
}
