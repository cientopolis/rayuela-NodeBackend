import { Injectable } from '@nestjs/common';
import {
  BadgeEngine,
  LeaderboardEngine,
  PointsEngine,
} from '../../../../checkin/entities/game.entity';
import {
  GamificationStrategy,
  LeaderboardStrategy,
} from '../../../../project/dto/create-project.dto';
import { BasicPointsEngine } from './basic-points-engine';
import { ElasticPointsEngine } from './elastic-points-engine';
import { PointsFirstLBEngine } from './basic-leaderboard-engine';
import { BasicBadgeEngine } from './basic-badge-engine';
import { BadgesFirstLBEngine } from './badge-first-leaderboard-engine';

@Injectable()
export class GamificationEngineFactory {
  constructor(
    private readonly basicPointEngine: BasicPointsEngine,
    private readonly elasticPointEngine: ElasticPointsEngine,
    private readonly pointsFirstLBEngine: PointsFirstLBEngine,
    private readonly badgesFirstLBEngine: BadgesFirstLBEngine,
    private readonly basicBadgeEngine: BasicBadgeEngine,
  ) {}

  getBadgeEngine(gamificationStrategy: GamificationStrategy): BadgeEngine {
    switch (gamificationStrategy) {
      case GamificationStrategy.BASIC:
        return this.basicBadgeEngine;
      case GamificationStrategy.ELASTIC:
        return this.basicBadgeEngine;
      // Fading changes *which* badges are on offer over time, never how a
      // check-in is evaluated — the window is enforced inside the basic
      // engine's awardable filter.
      case GamificationStrategy.BADGE_FADING:
        return this.basicBadgeEngine;
      default:
        throw new Error(
          `Unknown gamification engine type: ${gamificationStrategy}`,
        );
    }
  }

  getPointsEngine(gamificationStrategy: GamificationStrategy): PointsEngine {
    switch (gamificationStrategy) {
      case GamificationStrategy.BASIC:
        return this.basicPointEngine;
      case GamificationStrategy.ELASTIC:
        return this.elasticPointEngine;
      // Scoring is untouched by fading, so it stays on the basic engine.
      // Missing this case would make every check-in on a fading project
      // throw, silently killing points *and* badges.
      case GamificationStrategy.BADGE_FADING:
        return this.basicPointEngine;
      default:
        throw new Error(
          `Unknown gamification engine type: ${gamificationStrategy}`,
        );
    }
  }

  getLeaderboardEngine(
    leaderboardStrategy: LeaderboardStrategy,
  ): LeaderboardEngine {
    switch (leaderboardStrategy) {
      case LeaderboardStrategy.POINTS_FIRST:
        return this.pointsFirstLBEngine;
      case LeaderboardStrategy.BADGES_FIRST:
        return this.badgesFirstLBEngine;
      default:
        throw new Error(
          `Unknown gamification engine type: ${leaderboardStrategy}`,
        );
    }
  }
}
