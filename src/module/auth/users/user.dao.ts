import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserTemplate } from './user.schema';
import { User } from './user.entity';
import { UserMapper } from './UserMapper';
import { RegisterUserDTO } from '../auth.controller';

@Injectable()
export class UserDao {
  constructor(
    @InjectModel(UserTemplate.collectionName())
    private userModel: Model<UserDocument>,
  ) {}

  async findByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<User | null> {
    const userDocument = await this.userModel
      .findOne({ $or: [{ email }, { username }] })
      .exec();
    return userDocument ? UserMapper.toEntity(userDocument) : null;
  }

  async create(userData: User): Promise<User> {
    const createdUser = new this.userModel(UserMapper.toTemplate(userData));
    const savedUser = await createdUser.save();
    return UserMapper.toEntity(savedUser);
  }

  async getUserById(userId: string): Promise<User | null> {
    const userDocument = await this.userModel.findById(userId).exec();
    return userDocument ? UserMapper.toEntity(userDocument) : null;
  }

  async update(id: string, userData: any): Promise<User | null> {
    const updatedUser = await this.userModel
      .findOneAndUpdate({ _id: id }, userData, {
        new: true, // Devuelve el documento actualizado
      })
      .exec();
    return updatedUser ? UserMapper.toEntity(updatedUser) : null;
  }
}
