import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BcryptService } from 'src/service/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/service/authService.service';

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
export class UsersModule {}
