import { Injectable } from '@nestjs/common';
import { UserDocument } from './user.schema';
import { UserDao } from './user.dao';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}

  async findByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<UserDocument | null> {
    return this.userDao.findByEmailOrUsername(email, username);
  }

  async create(userData: any): Promise<UserDocument> {
    return this.userDao.create(userData);
  }

  async update(id: string, userData: any): Promise<UserDocument> {
    return this.userDao.update(id, userData);
  }

  async getByUserId(userId: string): Promise<UserDocument | null> {
    return this.userDao.getUserById(userId);
  }
}
