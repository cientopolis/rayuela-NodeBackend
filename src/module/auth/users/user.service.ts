import { Injectable } from '@nestjs/common';
import { UserDocument } from './user.schema';
import { UserDao } from './user.dao';

@Injectable()
export class UsersService {
  constructor(private readonly userDao: UserDao) {}

  async findByEmailOrUsername(email: string, username: string): Promise<UserDocument | null> {
    return this.userDao.findByEmailOrUsername(email, username);
  }

  async create(userData: any): Promise<UserDocument> {
    return this.userDao.create(userData);
  }
}
