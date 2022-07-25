import { Injectable } from '@nestjs/common';
import { SerializedUser } from 'src/users/types';

@Injectable()
export class UsersService {
  private users: SerializedUser[] = [
    { username: 'user', password: 'user' },
    { username: 'user', password: 'user' },
    { username: 'user', password: 'user' },
    { username: 'user', password: 'user' },
    { username: 'user', password: 'user' },
  ];

  getUsers() {
    return this.users.map((user) => new SerializedUser(user));
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
