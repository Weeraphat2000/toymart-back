import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Headers,
  NotFoundException,
  ValidationPipe,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UserAddresDto } from './dto/create-user.dto';
import { UpdateUserAdressDto, UpdateUserDto } from './dto/update-user.dto';
import { BcryptService } from 'src/service/bcrypt.service';
import { AuthService } from 'src/service/authService.service';
import { CustomRequest } from 'src/middleware/authendicate.service';
// import { Request, Response } from 'express';

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
    await this.usersService.createReward(user.id);
    // const userProfile = await this.usersService.creatUserProfile(user.id, )
    const userUser = await this.usersService.createUser(createUserDto, user.id);
    const token = await this.authService.createToken({
      userId: user.id,
      role: user.role,
    });

    return { user: userUser, token };
  }

  @Get('/allAddress') // ✅
  async getAddress(@Request() req: CustomRequest) {
    return { allAddress: await this.usersService.getAddress(req.user.id) };
  }

  @Post('/create-address') // ✅
  async createAddress(
    @Request() req: CustomRequest,
    @Body() body: UserAddresDto,
  ) {
    return await this.usersService.createAddress(req.user.id, body);
  }

  @Delete('/delete-address/:addressId') // ✅
  async deleteAddress(
    @Param('addressId', ParseIntPipe) addressId: number,
    @Request() req: CustomRequest,
  ) {
    const check = await this.usersService.findAddressByUserIdAndAddressId(
      req.user.id,
      addressId,
    );
    if (!check) {
      throw new NotFoundException('address id invalid');
    }
    return this.usersService.deleteAddress(addressId);
  }

  @Patch('/update-address/:addressId') // ✅
  async updateAddress(
    @Param('addressId', ParseIntPipe) id: number,
    @Body() body: UpdateUserAdressDto,
    @Request() req: CustomRequest,
  ) {
    const check = await this.usersService.findAddressByUserIdAndAddressId(
      req.user.id,
      id,
    );
    if (!check) {
      throw new NotFoundException('address id invalid');
    }
    return await this.usersService.updateAddres(id, body);
  }

  @Get('/reward/:userId')
  async getReward(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.getRewards(userId);
  }

  @Patch('/increase/:userId')
  async increaseReward(
    @Param('userId', ParseIntPipe) userId: number,
    @Body('point', ParseIntPipe) point: number,
  ) {
    return await this.usersService.addReward(userId, point);
  }
  @Patch('/decrease/:userId')
  async decreaseReward(
    @Param('userId', ParseIntPipe) userId: number,
    @Body('point', ParseIntPipe) point: number,
  ) {
    return await this.usersService.deleteReward(userId, point);
  }

  @Get('/whitelist/:userId')
  async getWhitelist(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.getWhitelist(userId);
  }

  @Patch('/whitelist/:userId/:productId')
  async updateWhitelist(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    const findWhiteList = await this.usersService.findWhiteList(
      userId,
      productId,
    );
    if (findWhiteList) {
      return await this.usersService.deleteWhitelist(findWhiteList.id);
    }
    return await this.usersService.addWhitelist(userId, productId);
  }

  @Post('/autoLogin')
  async autoLogin(@Headers('authorization') authorization: string) {
    try {
      const token = authorization.split(' ')[1];
      const user = await this.usersService.findUserById(
        this.authService.verify(token).userId,
      );
      delete user.password;
      return user;
    } catch (error) {
      throw new NotFoundException(['token invalid']);
    }
  }

  @Post('/login') // ✅
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
    delete user.password;
    const token = await this.authService.createToken({
      userId: user.id,
      role: user.role,
    });
    return { user, token };
  }

  // @Get('/') // ✅
  // findOne(@Body('user') req: CustomRequest) {
  //   return req;
  // }
  @Get('/') // ✅
  finOne(@Request() req: CustomRequest) {
    console.log(req.user, 'users');
    return { user: req.user };
  }
  @Get('/profile') // ✅
  async getprofile(@Request() req: CustomRequest) {
    const userProfile = await this.usersService.getProfileById(req.user.id);
    return { userProfile };
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
