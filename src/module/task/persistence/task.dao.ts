import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDocument } from './task.schema';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';

@Injectable()
export class TaskDao {
  constructor(@InjectModel("Task") private taskModel: Model<TaskDocument>) {}

  async create(taskData: CreateTaskDto): Promise<TaskDocument> {
    const createdTask = new this.taskModel(taskData);
    return createdTask.save();
  }

  async getTaskById(taskId: string): Promise<Task> {
    return await this.taskModel.findById(taskId).exec()['_doc'] as Task;
  }

  async getAllTasks(): Promise<TaskDocument[]> {
    return this.taskModel.find().exec();
  }

  async updateTask(taskId: string, taskData: any): Promise<TaskDocument | null> {
    return this.taskModel.findByIdAndUpdate(taskId, taskData, { new: true }).exec();
  }

  async deleteTask(taskId: string): Promise<TaskDocument | null> {
    return this.taskModel.findByIdAndDelete(taskId).exec();
  }

  async findByNameOrDescription(name: string, description: string): Promise<TaskDocument | null> {
    return this.taskModel.findOne({ $or: [{ name }, { description }] }).exec();
  }
}
