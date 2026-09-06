import { Test, TestingModule } from '@nestjs/testing';
import { GamificationEngineFactory } from './gamification-strategy-factory';
import { BasicPointsEngine } from './basic-points-engine';
import { ElasticPointsEngine } from './elastic-points-engine';
import { PointsFirstLBEngine } from './basic-leaderboard-engine';
import { BadgesFirstLBEngine } from './badge-first-leaderboard-engine';
import { BasicBadgeEngine } from './basic-badge-engine';
import {
  GamificationStrategy,
  LeaderboardStrategy,
} from '../../../../project/dto/create-project.dto';

describe('GamificationEngineFactory', () => {
  let factory: GamificationEngineFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamificationEngineFactory,
        { provide: BasicPointsEngine, useValue: {} },
        { provide: ElasticPointsEngine, useValue: {} },
        { provide: PointsFirstLBEngine, useValue: {} },
        { provide: BadgesFirstLBEngine, useValue: {} },
        { provide: BasicBadgeEngine, useValue: {} },
      ],
    }).compile();

    factory = module.get<GamificationEngineFactory>(GamificationEngineFactory);
  });

  describe('badge fading strategy', () => {
    // The factory throws on an unknown strategy, so a project switched to
    // fading without these cases would fail every single check-in — no
    // points, no badges.
    it('does not throw the way an unmapped strategy would', () => {
      expect(() =>
        factory.getBadgeEngine(GamificationStrategy.BADGE_FADING),
      ).not.toThrow();
      expect(() =>
        factory.getPointsEngine(GamificationStrategy.BADGE_FADING),
      ).not.toThrow();
    });

    // Identity, not just "something came back": fading changes *which*
    // badges are on offer over time, never how a check-in is evaluated, so
    // it has to land on exactly the engines BASIC uses. Asserting only
    // `toBeDefined` would pass even if it were wired to the elastic engine,
    // which would silently change everyone's scoring.
    it('routes to the same engines as the basic strategy', () => {
      expect(factory.getBadgeEngine(GamificationStrategy.BADGE_FADING)).toBe(
        factory.getBadgeEngine(GamificationStrategy.BASIC),
      );
      expect(factory.getPointsEngine(GamificationStrategy.BADGE_FADING)).toBe(
        factory.getPointsEngine(GamificationStrategy.BASIC),
      );
    });

    it('does not borrow the elastic scoring engine', () => {
      expect(
        factory.getPointsEngine(GamificationStrategy.BADGE_FADING),
      ).not.toBe(factory.getPointsEngine(GamificationStrategy.ELASTIC));
    });
  });

  it('should return correct engines', () => {
    expect(factory.getBadgeEngine(GamificationStrategy.BASIC)).toBeDefined();
    expect(factory.getBadgeEngine(GamificationStrategy.ELASTIC)).toBeDefined();
    expect(factory.getPointsEngine(GamificationStrategy.BASIC)).toBeDefined();
    expect(factory.getPointsEngine(GamificationStrategy.ELASTIC)).toBeDefined();
    expect(
      factory.getLeaderboardEngine(LeaderboardStrategy.POINTS_FIRST),
    ).toBeDefined();
    expect(
      factory.getLeaderboardEngine(LeaderboardStrategy.BADGES_FIRST),
    ).toBeDefined();
  });

  it('should throw error for unknown strategies', () => {
    expect(() => factory.getBadgeEngine('UNKNOWN' as any)).toThrow();
    expect(() => factory.getPointsEngine('UNKNOWN' as any)).toThrow();
    expect(() => factory.getLeaderboardEngine('UNKNOWN' as any)).toThrow();
  });
});
