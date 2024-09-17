import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectDao } from './persistence/project.dao';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectTemplate } from './persistence/project.schema';
import { Task } from '../task/entities/task.entity';

@Injectable()
export class ProjectService {
  constructor(private readonly projectDao: ProjectDao) {}

  async findAll(): Promise<ProjectTemplate[]> {
    return this.projectDao.findAll();
  }

  async findOne(id: string): Promise<ProjectTemplate> {
    return this.projectDao.findOne(id);
  }

  async create(createProjectDto: CreateProjectDto): Promise<ProjectTemplate> {
    return this.projectDao.create(createProjectDto);
  }

  async update(
    id: string,
    updateProjectDto: CreateProjectDto,
  ): Promise<ProjectTemplate> {
    return this.projectDao.update(id, updateProjectDto);
  }

  async remove(id: string): Promise<void> {
    return this.projectDao.remove(id);
  }

  async getTaskCombinations(id: string) {
    const project = await this.projectDao.findOne(id);
    if (!project) {
      throw new NotFoundException('Project not Found');
    }
    const combinations = [];
    project.areas.forEach((area) => {
      project.taskTypes.forEach((type) => {
        project.timeIntervals.forEach((timeInterval) => {
          combinations.push([
            new Task(
              `T${combinations.length + 1}`,
              '',
              id,
              timeInterval,
              area,
              1,
              type,
            ),
          ]);
        });
      });
    });
  }
}
