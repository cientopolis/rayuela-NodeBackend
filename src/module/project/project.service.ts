import { Injectable } from '@nestjs/common';
import { ProjectDao } from './persistence/project.dao';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectTemplate } from './persistence/project.schema';

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
}
