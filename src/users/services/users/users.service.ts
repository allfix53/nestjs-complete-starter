import { Injectable } from '@nestjs/common';
import { SerializedUser } from 'src/users/types';

@Injectable()
export class UsersService {
  private users: SerializedUser[] = [
    { id: 1, username: 'user1', password: 'user' },
    { id: 2, username: 'user2', password: 'user' },
    { id: 3, username: 'user3', password: 'user' },
    { id: 4, username: 'user4', password: 'user' },
    { id: 5, username: 'user5', password: 'user' },
  ];

  getUsers() {
    return this.users.map((user) => new SerializedUser(user));
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
