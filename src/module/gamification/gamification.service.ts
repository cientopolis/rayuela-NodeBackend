import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBadgeRuleDTO } from './dto/create-badge-rule-d-t.o';
import { UpdateBadgeStatusDto } from './dto/update-badge-status.dto';
import { BadgeStatus } from './entities/gamification.entity';
import { GamificationDao } from './persistence/gamification-dao.service';
import { UpdateGamificationDto } from './dto/update-gamification.dto';
import { UpdateBadgeRuleDTO } from './dto/update-badge-rule-d-t.o';
import { CreateScoreRuleDto } from './dto/create-score-rule-dto';
import { UpdateScoreRuleDto } from './dto/update-score-rule.dto';
import { Move } from '../checkin/entities/move.entity';

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

  // `async` so a rejected window surfaces as a rejected promise rather than a
  // synchronous throw from a method that otherwise returns one.
  async updateBadgeStatus(
    projectId: string,
    id: string,
    status: BadgeStatus,
    dto: UpdateBadgeStatusDto = {},
  ) {
    return this.gamificationDao.updateBadgeStatus(
      projectId,
      id,
      status,
      this.parseFadingWindow(status, dto),
    );
  }

  /**
   * Turns the request body into a validated fading window.
   *
   * A `faded` badge without a future `expiresAt` would be a badge that is
   * announced as disappearing and then never does (or one that is already
   * gone the moment it is announced) — neither is a state the strategy has,
   * so both are rejected here rather than stored.
   */
  private parseFadingWindow(
    status: BadgeStatus,
    dto: UpdateBadgeStatusDto,
  ): { expiresAt?: Date; fadeReason?: string } {
    const fadeReason = dto.fadeReason?.trim() || undefined;
    if (status !== BadgeStatus.Faded) {
      return { fadeReason };
    }

    if (!dto.expiresAt) {
      throw new BadRequestException(
        'Una insignia en desvanecimiento necesita una fecha de expiración (expiresAt)',
      );
    }
    const expiresAt = new Date(dto.expiresAt);
    if (Number.isNaN(expiresAt.getTime())) {
      throw new BadRequestException('expiresAt no es una fecha válida');
    }
    if (expiresAt.getTime() <= Date.now()) {
      throw new BadRequestException(
        'expiresAt debe ser una fecha futura: la ventana de desvanecimiento no puede nacer cerrada',
      );
    }
    return { expiresAt, fadeReason };
  }

  updateBadge(id: string, updateBadgeDTO: UpdateBadgeRuleDTO) {
    return this.gamificationDao.updateBadge(id, updateBadgeDTO);
  }

  createScoreRule(dto: CreateScoreRuleDto) {
    return this.gamificationDao.addScoreRule(dto.projectId, dto);
  }

  updateScoreRule(dto: UpdateScoreRuleDto) {
    return this.gamificationDao.updatePointRule(dto.projectId, dto);
  }

  removeScoreRule(projectId: string, id: string) {
    return this.gamificationDao.deletePointRule(projectId, id);
  }

  saveMove(move: Move) {
    return this.gamificationDao.saveMove(move);
  }
}
