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
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto, CreateAdminDto, LoginDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { BcryptService } from 'src/service/bcrypt.service';
import { AuthService } from 'src/service/authService.service';
import { UsersService } from 'src/users/users.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly bcryptService: BcryptService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/resgister') // ✅
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    delete createAdminDto.confirmPassword;
    return this.adminService.create(createAdminDto);
  }

  @Get('/all-user') // ✅
  async getAllUser() {
    const allUser = await this.adminService.getAllUser();
    allUser.forEach((item) => delete item.password);
    return allUser;
  }

  @Get('/all-admin') // ✅
  async getAllAdmin(@Body() body: { role: string }) {
    if (!(body.role == 'SUPERADMIN')) {
      throw new NotFoundException('ไม่มีสิmธ์');
    }
    const allAdmin = await this.adminService.getAllAdmin();
    allAdmin.forEach((item) => delete item.password);
    return allAdmin;
  }

  @Patch('/ban/:userId') // ✅
  async banUser(@Param('userId', ParseIntPipe) userId: number) {
    const findUser = await this.usersService.findUserById(userId);
    if (findUser.isActive) {
      return await this.adminService.banUserByUserId(userId, false);
    }
    if (findUser.role == 'SUPERADMIN') {
      throw new NotFoundException('ไม่มีทาง ban super admin ได้นะจ้ะ');
    }
    return await this.adminService.banUserByUserId(userId, true);
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

  @Post('/superAdmin-login') // ✅
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
    const token = await this.authService.createToken({
      userId: user.id,
      role: user.role,
    });
    delete user.password;
    return { user, token };
  }

  @Post('/admin-login') // ✅
  async adminLogin(@Body() body: LoginDto) {
    const user = await this.adminService.addminLogin(body.email);
    const verify = this.bcryptService.compareSync(
      body.password,
      user?.password || ' ',
    );
    if (!verify) {
      throw new NotFoundException('email or password invalid');
    }
    const token = await this.authService.createToken({
      userId: user.id,
      role: user.role,
    });
    return { user, token };
  }
}
