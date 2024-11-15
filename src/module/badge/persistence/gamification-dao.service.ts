import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BadgeDocument, GamificationTemplate } from './gamification.schema';
import { CreateBadgeDto } from '../dto/create-badge.dto';
import { UpdateBadgeDto } from '../dto/update-badge.dto';

@Injectable()
export class GamificationDao {
  constructor(
    @InjectModel(GamificationTemplate.collectionName())
    private readonly badgeModel: Model<BadgeDocument>,
  ) {}

  async create(createBadgeDto: CreateBadgeDto): Promise<GamificationTemplate> {
    const newBadge = new this.badgeModel(createBadgeDto);
    return newBadge.save();
  }

  async findAllByProject(projectId: string): Promise<GamificationTemplate[]> {
    return this.badgeModel.find({ projectId }).exec();
  }

  async findById(id: string): Promise<GamificationTemplate | null> {
    return this.badgeModel.findById(id).exec();
  }

  async update(
    id: string,
    updateBadgeDto: UpdateBadgeDto,
  ): Promise<GamificationTemplate | null> {
    return this.badgeModel
      .findByIdAndUpdate(id, updateBadgeDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<GamificationTemplate | null> {
    return this.badgeModel.findByIdAndDelete(id).exec();
  }
}
