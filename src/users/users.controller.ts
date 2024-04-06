import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  BadRequestException,
  Headers,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BcryptService } from 'src/service/bcrypt.service';
import { AuthService } from 'src/service/authService.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly bcryptService: BcryptService,
    private readonly authService: AuthService,
  ) {}

  @Post('/')
  async create(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: 'USER' | 'ADMIN' | 'SUPERADMIN',
  ) {
    const isDuplicate = await this.usersService.findUserByEmail(email);

    if (isDuplicate) {
      // throw new HttpException('email already to use', HttpStatus.BAD_REQUEST);
      throw new BadRequestException(['email is already to use']);
    }

    const hasdPassword = await this.bcryptService.hashPassword(password);
    const user = await this.usersService.creatTableUser({
      email,
      password: hasdPassword,
      role,
    });
    delete createUserDto.email;
    delete createUserDto.password;
    delete createUserDto.role;
    const userUser = await this.usersService.createUser(createUserDto, user.id);
    const token = await this.authService.createToken({ userId: user.id });

    return { user: userUser, token };
  }

  @Post('/autoLogin')
  async autoLogin(@Headers('authorization') authorization: string) {
    try {
      const token = authorization.split(' ')[1];
      const user = await this.usersService.findUser(
        this.authService.verify(token).userId,
      );
      delete user.password;
      return user;
    } catch (error) {
      throw new NotFoundException(['token invalid']);
    }
  }

  @Post('/login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.usersService.findUserByEmail(body.email);
    if (!user) {
      throw new NotFoundException(['email or password invalid']);
    }
    const checkPassword = await this.bcryptService.compareSync(
      body.password,
      user.password,
    );
    if (!checkPassword) {
      throw new NotFoundException(['email or password invalid']);
    }

    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
