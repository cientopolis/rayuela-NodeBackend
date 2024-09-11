import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskDao } from './persistence/task.dao';

@Injectable()
export class TaskService {
  constructor(private readonly taskDao: TaskDao) {}

  async create(createTaskDto: CreateTaskDto) {
    return await this.taskDao.create(createTaskDto);
  }

  async findAll() {
    return await this.taskDao.getAllTasks();
  }

  async findOne(id: string) {
    return await this.taskDao.getTaskById(id);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return await this.taskDao.updateTask(id, updateTaskDto);
  }

  async remove(id: string) {
    return await this.taskDao.deleteTask(id);
  }
}
