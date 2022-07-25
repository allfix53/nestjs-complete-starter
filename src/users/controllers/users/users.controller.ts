import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { HttpsExceptionFilter } from 'src/users/filters/HttpException.filter';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types';
import { encodePassword } from 'src/utils/bcrypt';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  // get users
  @UseInterceptors(ClassSerializerInterceptor) // to hide password with interceptor
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  // get user by username
  @UseInterceptors(ClassSerializerInterceptor) // to hide password with interceptor
  @Get('username/:username')
  getUserByUsername(@Param('username') username: string) {
    const user = this.userService.getUserByUsername(username);
    if (user) return new SerializedUser(user);
    else
      throw new HttpException(
        `User with username: ${username} not found!`,
        HttpStatus.NOT_FOUND,
      );
  }

  // get user by id
  @UseFilters(HttpsExceptionFilter)
  @UseInterceptors(ClassSerializerInterceptor) // to hide password with interceptor
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.getUserById(id);

    if (user) return new SerializedUser(user);
    else {
      throw new UserNotFoundException();
    }
  }

  // create user
  @UsePipes(ValidationPipe)
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    const password = encodePassword(createUserDto.password);
    const newUser = { ...createUserDto, password };
    return this.userService.createUser(newUser);
  }
}
