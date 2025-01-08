import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserTemplate } from './user.schema';
import { User } from './user.entity';
import { UserMapper } from './UserMapper';

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

  async update(id: string, userData: User): Promise<User | null> {
    const updatedUser = await this.userModel
      .findOneAndUpdate({ _id: id }, UserMapper.toTemplate(userData), {
        new: true, // Devuelve el documento actualizado
      })
      .exec();
    return updatedUser ? UserMapper.toEntity(updatedUser['_doc']) : null;
  }

  async getAllByProjectId(projectId: string): Promise<User[]> {
    const userDocuments = await this.userModel
      .find({ projects: projectId }) // Verifica directamente si projectId está en el array
      .exec();

    return userDocuments.map((doc) => UserMapper.toEntity(doc));
  }
}
