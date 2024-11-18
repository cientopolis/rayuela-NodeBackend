import { Injectable } from '@nestjs/common';
import { CreateBadgeRuleDTO } from './dto/create-badge-rule-d-t.o';
import { GamificationDao } from './persistence/gamification-dao.service';
import { UpdateGamificationDto } from './dto/update-gamification.dto';
import { UpdateBadgeRuleDTO } from './dto/update-badge-rule-d-t.o';

@Injectable()
export class GamificationService {
  constructor(private readonly gamificationDao: GamificationDao) {}

  createBadge(createBadgeDto: CreateBadgeRuleDTO) {
    return this.gamificationDao.addBadge(
      createBadgeDto.projectId,
      createBadgeDto,
    );
  }

  findByProjectId(projectId: string) {
    return this.gamificationDao.getGamificationByProjectId(projectId);
  }

  update(projectId: string, gamificationDto: UpdateGamificationDto) {
    return this.gamificationDao.updateGamification(projectId, gamificationDto);
  }

  removeBadge(projectId: string, id: string) {
    return this.gamificationDao.deleteBadge(projectId, id);
  }

  updateBadge(id: string, updateBadgeDTO: UpdateBadgeRuleDTO) {
    return this.gamificationDao.updateBadge(id, updateBadgeDTO);
  }
}
