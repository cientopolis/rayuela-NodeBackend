import { Injectable } from '@nestjs/common';
import { UserDao } from './user.dao';
import { User } from './user.entity';
import { Checkin } from '../../checkin/entities/checkin.entity';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}

  async findByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<User | null> {
    return this.userDao.findByEmailOrUsername(email, username);
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    return this.userDao.findByGoogleId(googleId);
  }

  async create(userData: User): Promise<User> {
    return this.userDao.create(userData);
  }

  async update(id: string, userData: User): Promise<User> {
    return this.userDao.update(id, userData);
  }

  async getByUserId(userId: string): Promise<User | null> {
    return await this.userDao.getUserById(userId);
  }

  addRefreshSession(userId: string, hash: string, expiry: Date, max: number) {
    return this.userDao.addRefreshSession(userId, hash, expiry, max);
  }

  touchRefreshSession(
    userId: string,
    hash: string,
    expiry: Date,
    max: number,
  ): Promise<boolean> {
    return this.userDao.touchRefreshSession(userId, hash, expiry, max);
  }

  removeRefreshSession(userId: string, hash: string) {
    return this.userDao.removeRefreshSession(userId, hash);
  }

  clearRefreshSessions(userId: string) {
    return this.userDao.clearRefreshSessions(userId);
  }

  async findAllByProjectId(projectId: string): Promise<User[]> {
    return await this.userDao.getAllByProjectId(projectId);
  }

  async saveResetToken(id: string, resetToken: string) {
    const u = await this.getByUserId(id);
    u.resetToken = resetToken;
    await this.userDao.update(id, u);
  }

  async rate(userId: string, checkin: Checkin, rate: number) {
    const u = await this.getByUserId(userId);
    if (!u) {
      throw new Error('User not found');
    }
    u.addRating(checkin, rate);
    await this.update(u.id, u);
    return u;
  }

  getUserByResetToken(token: string): Promise<User | null> {
    return this.userDao.getUserByResetToken(token);
  }
}
