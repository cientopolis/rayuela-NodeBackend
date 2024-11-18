import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BadgeTemplate,
  GamificationTemplate,
  GamificationTemplateDocument,
} from './gamification.schema';
import { CreateBadgeRuleDTO } from '../dto/create-badge-rule-d-t.o';
import { BadgeRule, Gamification, PointRule } from '../entities/badge.entity';
import { UpdateGamificationDto } from '../dto/update-gamification.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateBadgeRuleDTO } from '../dto/update-badge-rule-d-t.o';

@Injectable()
export class GamificationDao {
  constructor(
    @InjectModel(GamificationTemplate.collectionName())
    private readonly gamificationModel: Model<GamificationTemplateDocument>,
  ) {}

  async addBadge(
    projectId: string,
    createBadgeDto: CreateBadgeRuleDTO,
  ): Promise<GamificationTemplate | null> {
    const gamificationTemplate = await this.gamificationModel.findOne({
      projectId,
    });
    if (!gamificationTemplate) {
      throw new Error('Project not found');
    }
    gamificationTemplate.badges.push({ _id: uuidv4(), ...createBadgeDto });
    return gamificationTemplate.save();
  }

  async getBadgesByProject(
    projectId: string,
  ): Promise<GamificationTemplate | null> {
    return this.gamificationModel.findOne({ projectId }, { badges: 1 }).exec();
  }

  async getPointRulesByProject(
    projectId: string,
  ): Promise<GamificationTemplate | null> {
    return this.gamificationModel
      .findOne({ projectId }, { pointRules: 1 })
      .exec();
  }

  async findBadgeById(
    projectId: string,
    badgeId: string,
  ): Promise<GamificationTemplate | null> {
    return this.gamificationModel
      .findOne({ projectId, 'badges._id': badgeId }, { 'badges.$': 1 })
      .exec();
  }

  async updateGamification(
    projectId: string,
    gamificationDto: UpdateGamificationDto,
  ): Promise<GamificationTemplate | null> {
    return this.gamificationModel
      .findOneAndUpdate({ projectId }, gamificationDto, { new: true })
      .exec();
  }

  async deleteBadge(
    projectId: string,
    badgeId: string,
  ): Promise<GamificationTemplate | null> {
    return this.gamificationModel
      .findOneAndUpdate(
        { projectId },
        { $pull: { badges: { _id: badgeId } } },
        { new: true },
      )
      .exec();
  }

  async addPointRule(
    projectId: string,
    pointRule: {
      score: number;
      areaId: string;
      timeIntervalId: string;
      taskType: string;
    },
  ): Promise<GamificationTemplate | null> {
    const gamificationTemplate = await this.gamificationModel.findOne({
      projectId,
    });
    if (!gamificationTemplate) {
      throw new Error('Project not found');
    }
    gamificationTemplate.pointRules.push({ _id: uuidv4(), ...pointRule });
    return gamificationTemplate.save();
  }

  async updatePointRule(
    projectId: string,
    ruleId: string,
    updatedRule: {
      score: number;
      areaId: string;
      timeIntervalId: string;
      taskType: string;
    },
  ): Promise<GamificationTemplate | null> {
    return this.gamificationModel
      .findOneAndUpdate(
        { projectId, 'pointRules._id': ruleId },
        { $set: { 'pointRules.$': updatedRule } },
        { new: true },
      )
      .exec();
  }

  async deletePointRule(
    projectId: string,
    ruleId: string,
  ): Promise<GamificationTemplate | null> {
    return this.gamificationModel
      .findOneAndUpdate(
        { projectId },
        { $pull: { pointRules: { _id: ruleId } } },
        { new: true },
      )
      .exec();
  }

  async getGamificationByProjectId(projectId: string): Promise<Gamification> {
    const saved = await this.gamificationModel.findOne({ projectId }).exec();
    return new Gamification(
      projectId,
      saved.badges.map(
        (b) =>
          new BadgeRule(
            b._id,
            b.name,
            b.taskType,
            b.description,
            b.imageUrl,
            b.checkinsAmount,
            b.mustContribute,
            b.previousBadges,
            b.taskType,
            b.areaId,
            b.timeIntervalId,
          ),
      ),
      saved.pointRules.map(
        (r) =>
          new PointRule(
            r._id,
            projectId,
            r.taskType,
            r.areaId,
            r.timeIntervalId,
          ),
      ),
    );
  }

  async updateBadge(id: string, updateBadgeDTO: UpdateBadgeRuleDTO) {
    const gamificationTemplate = await this.gamificationModel.findOne({
      projectId: updateBadgeDTO.projectId,
    });
    if (!gamificationTemplate) {
      throw new Error('Project not found');
    }
    gamificationTemplate.badges = gamificationTemplate.badges
      .filter((b) => b._id === id)
      .concat([updateBadgeDTO as BadgeTemplate]);
    return gamificationTemplate.save();
  }

  async createNewGamificationFor(projectId: string) {
    return this.gamificationModel.create({
      projectId,
      badges: [],
      pointRules: [],
    });
  }
}
