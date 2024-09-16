import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDocument, TaskSchemaTemplate } from './task.schema';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { ProjectDao } from '../../project/persistence/project.dao';
import { TaskTimeRestriction } from '../entities/time-restriction.entity';

@Injectable()
export class TaskDao {
  constructor(
    @InjectModel(TaskSchemaTemplate.collectionName())
    private taskModel: Model<TaskDocument>,
    private projectDao: ProjectDao,
  ) {}

  async create(taskData: CreateTaskDto): Promise<TaskDocument> {
    const createdTask = new this.taskModel(taskData);
    return createdTask.save();
  }

  async getTaskById(taskId: string): Promise<Task> {
    const res = await this.taskModel.findById(taskId).exec();
    return await this.mapDocToTask(res['_doc']);
  }

  async getAllTasks(): Promise<TaskDocument[]> {
    return this.taskModel.find().exec();
  }

  async updateTask(
    taskId: string,
    taskData: any,
  ): Promise<TaskDocument | null> {
    return this.taskModel
      .findByIdAndUpdate(taskId, taskData, { new: true })
      .exec();
  }

  async deleteTask(taskId: string): Promise<TaskDocument | null> {
    return this.taskModel.findByIdAndDelete(taskId).exec();
  }

  async findByNameOrDescription(
    name: string,
    description: string,
  ): Promise<TaskDocument | null> {
    return this.taskModel.findOne({ $or: [{ name }, { description }] }).exec();
  }

  private async mapDocToTask(doc: TaskDocument) {
    const project = await this.projectDao.findOne(doc.projectId.toString());
    const area = project.areas.find((a) => a.id === doc.areaId);
    if (!area) {
      throw new NotFoundException('Area not found');
    }
    return new Task(
      doc.name,
      doc.description,
      doc.projectId.toString(),
      this.mapTimeRestriction(doc.timeRestriction),
      area,
      doc.checkinAmount,
      doc.type,
    );
  }

  private mapTimeRestriction(timeRestriction): TaskTimeRestriction {
    return new TaskTimeRestriction(timeRestriction.days, timeRestriction.time);
  }
}
