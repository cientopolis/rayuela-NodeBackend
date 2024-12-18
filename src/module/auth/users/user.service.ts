import { Injectable } from '@nestjs/common';
import { UserDao } from './user.dao';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}

  async findByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<User | null> {
    return this.userDao.findByEmailOrUsername(email, username);
  }

  async create(userData: User): Promise<User> {
    return this.userDao.create(userData);
  }

  async update(id: string, userData: any): Promise<User> {
    return this.userDao.update(id, userData);
  }

  async getByUserId(userId: string): Promise<User | null> {
    return await this.userDao.getUserById(userId);
  }
}
