import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto, CreateAdminDto, LoginDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { BcryptService } from 'src/service/bcrypt.service';
import { AuthService } from 'src/service/authService.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly bcryptService: BcryptService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  // @Post('/superAdmin-auto-login')
  // superAdminAutoLogin(@Body() body: AdminDto) {
  //   console.log(body);
  //   return { user: body };
  // }

  @Post('/admin-auto-login')
  adminautoLogin(@Body() body: AdminDto) {
    return { user: body };
  }

  @Post('/superAdmin-login')
  async superAdminLogin(@Body() body: LoginDto) {
    const user = await this.adminService.findUserByEmail(body.email);
    if (!user) {
      throw new NotFoundException(['email or password invaild']);
    }
    const checkPassword = this.bcryptService.compareSync(
      body.password,
      user.password,
    );
    if (!checkPassword) {
      throw new BadRequestException(['email or password invalid']);
    }
    const token = await this.authService.createToken({ userId: user.id });
    delete user.password;
    return { user, token };
  }

  @Post('/dmin-login')
  adminLogin(@Body() body: LoginDto) {
    console.log(body);
  }
}
