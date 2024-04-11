import {
  Equals,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class CreateAdminDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty({ message: 'email is not empty' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'password is not empty' })
  password: string;

  @IsString()
  @Equals('password', { message: 'password and confirm password not match' }) // password == confrimPassword ไหม
  confirmPassword: string;

  @Matches('ADMIN')
  @IsNotEmpty({ message: 'role is not empty' })
  role: 'ADMIN';
}

export class LoginDto {
  @IsNotEmpty({ message: 'email is not empty' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'password is not empty' })
  password: string;
}

export class AdminDto {
  id: number;
  email: string;
  role: string;
  isActive: boolean;
}
