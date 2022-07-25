import { Exclude } from 'class-transformer';
import { LargeNumberLike } from 'crypto';

interface User {
  id: number;
  username: string;
  password: string;
}

export class SerializedUser {
  id: number;
  username: string;
  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
