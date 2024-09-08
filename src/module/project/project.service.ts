import { Injectable } from '@nestjs/common';
import { ProjectDao } from './persistence/project.dao';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './persistence/project.schema';

@Injectable()
export class ProjectService {
  constructor(private readonly projectDao: ProjectDao) {}

  async findAll(): Promise<Project[]> {
    return this.projectDao.findAll();
  }

  async findOne(id: string): Promise<Project> {
    return this.projectDao.findOne(id);
  }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectDao.create(createProjectDto);
  }

  async update(id: string, updateProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectDao.update(id, updateProjectDto);
  }

  async remove(id: string): Promise<void> {
    return this.projectDao.remove(id);
  }
}
