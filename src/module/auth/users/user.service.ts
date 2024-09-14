import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDocument } from './user.schema';
import { UserDao } from './user.dao';
import { UserJWT } from '../auth.service';

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

  async subscribeToProject(user: UserJWT, projectId: string) {
    const dbUser: any = await this.userDao.getUserById(user.userId);

    if (dbUser.projects.includes(projectId)) {
      throw new BadRequestException('Subscription already exists');
    }

    return this.userDao.save(user.userId, {
      ...dbUser._doc,
      projects: dbUser._doc.projects.concat([projectId]),
    });
  }
}
