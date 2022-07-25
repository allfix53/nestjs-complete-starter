import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor) // to hide password with interceptor
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor) // to hide password with interceptor
  @Get(':username')
  getUserByUsername(@Param('username') username: string) {
    const user = this.userService.getUserByUsername(username);
    if (user) return new SerializedUser(user);
    else
      throw new HttpException(
        `User with username: ${username} not found!`,
        HttpStatus.NOT_FOUND,
      );
  }
}
