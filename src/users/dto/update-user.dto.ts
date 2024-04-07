import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto, UserAddresDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  cityVillage?: string;

  @IsString()
  @IsOptional()
  apartmentSuite?: string;

  @IsString()
  @IsOptional()
  province?: string;

  @IsString()
  @IsOptional()
  zipCode?: string;

  @IsString()
  @IsOptional()
  other?: string;

  @IsString()
  @IsOptional()
  setDefault?: boolean;
}
// @IsEmail({}, { message: 'email' })
//   email?: string;

export class UpdateUserAdressDto extends PartialType(UserAddresDto) {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  cityVillage?: string;

  @IsString()
  @IsOptional()
  apartmentSuite?: string;

  @IsString()
  @IsOptional()
  province?: string;

  @IsString()
  @IsOptional()
  zipCode?: string;

  @IsString()
  @IsOptional()
  other?: string;

  @IsString()
  @IsOptional()
  setDefault?: boolean;
}
