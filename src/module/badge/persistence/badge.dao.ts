import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BadgeDocument, BadgeTemplate } from './badge.schema';
import { CreateBadgeDto } from '../dto/create-badge.dto';
import { UpdateBadgeDto } from '../dto/update-badge.dto';

@Injectable()
export class BadgeDao {
  constructor(
    @InjectModel(BadgeTemplate.collectionName())
    private readonly badgeModel: Model<BadgeDocument>,
  ) {}

  async create(createBadgeDto: CreateBadgeDto): Promise<BadgeTemplate> {
    const newBadge = new this.badgeModel(createBadgeDto);
    return newBadge.save();
  }

  async findAllByProject(projectId: string): Promise<BadgeTemplate[]> {
    return this.badgeModel.find({ projectId }).exec();
  }

  async findById(id: string): Promise<BadgeTemplate | null> {
    return this.badgeModel.findById(id).exec();
  }

  async update(
    id: string,
    updateBadgeDto: UpdateBadgeDto,
  ): Promise<BadgeTemplate | null> {
    return this.badgeModel
      .findByIdAndUpdate(id, updateBadgeDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<BadgeTemplate | null> {
    return this.badgeModel.findByIdAndDelete(id).exec();
  }
}
