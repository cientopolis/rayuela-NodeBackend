import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectTemplate, ProjectDocument } from './project.schema';
import { CreateProjectDto } from '../dto/create-project.dto';

@Injectable()
export class ProjectDao {
  constructor(
    @InjectModel(ProjectTemplate.collectionName())
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async findAll(): Promise<ProjectTemplate[]> {
    return this.projectModel.find().exec();
  }

  async findOne(id: string): Promise<ProjectTemplate> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async create(createProjectDto: CreateProjectDto): Promise<ProjectTemplate> {
    const project = new this.projectModel(createProjectDto);
    return project.save();
  }

  async update(
    id: string,
    updateProjectDto: CreateProjectDto,
  ): Promise<ProjectTemplate> {
    const updatedProject = await this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, { new: true })
      .exec();
    if (!updatedProject) {
      throw new NotFoundException('Project not found');
    }
    return updatedProject;
  }

  async remove(id: string): Promise<void> {
    const result = await this.projectModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Project not found');
    }
  }
}
