import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @MinLength(3)
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
