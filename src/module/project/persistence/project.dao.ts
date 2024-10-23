import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectDocument, ProjectTemplate } from './project.schema';
import { CreateProjectDto, Feature } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';

@Injectable()
export class ProjectDao {
  constructor(
    @InjectModel(ProjectTemplate.collectionName())
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async findAll(): Promise<(ProjectTemplate & { _id: string })[]> {
    return this.projectModel.find().exec();
  }

  async findOne(id: string): Promise<ProjectTemplate & { _id: string }> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return {
      _id: id,
      name: project.name,
      description: project.description,
      available: project.available,
      timeIntervals: project.timeIntervals,
      taskTypes: project.taskTypes,
      web: project.web,
      image: project.image,
      ownerId: project.ownerId,
      areas: {
        ...project.areas,
        features: project.areas.features.filter((f) => !f.properties.disabled),
      },
    };
  }

  async create(
    createProjectDto: CreateProjectDto,
  ): Promise<ProjectTemplate & { _id: string }> {
    const project = new this.projectModel(createProjectDto);
    return project.save();
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectTemplate & { _id: string }> {
    const oldProject = await this.projectModel.findById(id);
    updateProjectDto.areas = {
      type: 'FeatureCollection',
      features: this.getNewFeaturesFor(
        oldProject.areas.features,
        updateProjectDto.areas.features,
      ),
    };
    if (!oldProject) {
      throw new NotFoundException('Project not found');
    }
    return await this.projectModel
      .findByIdAndUpdate(id, { $set: { ...updateProjectDto } }, { new: true })
      .exec();
  }

  async toggleAvailable(id: string): Promise<void> {
    const prev = await this.findOne(id);
    const result = await this.projectModel
      .findByIdAndUpdate(id, { available: !prev.available })
      .exec();
    if (!result) {
      throw new NotFoundException('Project not found');
    }
  }

  private getNewFeaturesFor(oldFeatures: Feature[], newFeatures: Feature[]) {
    const res = [];
    for (const oldFeature of oldFeatures) {
      if (
        !newFeatures.find((f) => f.properties.id === oldFeature.properties.id) // is a new feature
      ) {
        res.push({
          // Save it disabled
          ...oldFeature,
          properties: { ...oldFeature.properties, disabled: true },
        });
      }
    }
    return res.concat(newFeatures);
  }
}
