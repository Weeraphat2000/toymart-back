import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  email: string;
  password: string;
  role: string;

  @IsNotEmpty({ message: 'first name is require' })
  firstName: string;

  @IsNotEmpty({ message: 'last name is require' })
  lastName: string;

  @IsNotEmpty({ message: 'phone is require' })
  @Length(10, 10, { message: 'phone invalid' })
  phone: string;

  @IsNotEmpty({ message: 'city village is not empty' })
  cityVillage: string;

  @IsOptional()
  apartmentSuite: string;

  @IsNotEmpty({ message: 'province is not empty' })
  province: string;

  @IsNotEmpty({ message: 'city village is not empty' })
  zipCode: string;

  @IsNotEmpty({ message: 'city village is not empty' })
  other: string;

  @IsOptional()
  setDefault: boolean;
}
//   @IsEmail({}, { message: 'emil invalid' })
//   @IsNotEmpty({ message: 'email is require' })
//   email: string;

//   @IsString()
//   @IsNotEmpty({ message: 'password is require' })
//   @Length(6, 30, { message: '6-30 character' })
//   password: string;

//   @IsNotEmpty({ message: 'role is not empty' })
//   role: 'USER' | 'ADMIN' | 'SUPERADMIN';

export class UserAddresDto {
  @IsNotEmpty({ message: 'first name is require' })
  firstName: string;

  @IsNotEmpty({ message: 'last name is require' })
  lastName: string;

  @IsNotEmpty({ message: 'phone is require' })
  @Length(10, 10, { message: 'phone invalid' })
  phone: string;

  @IsNotEmpty({ message: 'city village is not empty' })
  cityVillage: string;

  @IsOptional()
  apartmentSuite: string;

  @IsNotEmpty({ message: 'province is not empty' })
  province: string;

  @IsNotEmpty({ message: 'city village is not empty' })
  zipCode: string;

  @IsNotEmpty({ message: 'city village is not empty' })
  other: string;

  @IsOptional()
  setDefault: boolean;
}
