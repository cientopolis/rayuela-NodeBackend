import { Test, TestingModule } from '@nestjs/testing';
import { AdaptiveRecommendationEngine } from './adaptive-recommendation-engine';
import { Task } from '../../../task/entities/task.entity';
import { User } from '../../../auth/users/user.entity';
import { Checkin } from '../checkin.entity';
import { UserRole } from '../../../auth/users/user.schema';
import { TimeInterval } from '../../../task/entities/time-restriction.entity';
import { Feature } from '../../../project/dto/create-project.dto';

describe('AdaptiveRecommendationEngine', () => {
  let recommendationEngine: AdaptiveRecommendationEngine;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdaptiveRecommendationEngine],
    }).compile();

    recommendationEngine = module.get<AdaptiveRecommendationEngine>(
      AdaptiveRecommendationEngine,
    );
  });

  it('should be defined', () => {
    expect(recommendationEngine).toBeDefined();
  });

  describe('calculateUserSimilarity', () => {
    it('should return a similarity score based on check-ins', () => {
      const task = createTestTask('task1');
      const userA = createTestUser('1', [createTestCheckin('checkin1', task)]);
      const userB = createTestUser('2', [createTestCheckin('checkin2', task)]);

      const similarity = recommendationEngine['calculateUserSimilarity'](
        userA,
        userB,
      );
      expect(similarity).toBe(3);
    });
  });

  describe('predictTaskScore', () => {
    it('should return zero score for users with no tasks in common', () => {
      const targetUser = createTestUser('1', []);
      const task = createTestTask('task1');
      const relatedUser = createTestUser(
        '2',
        [],
        [
          {
            score: 5,
            checkinId: 'checkin1',
            taskId: 'task1',
          },
        ],
      );
      const allUsers = [relatedUser];

      const predictedScore = recommendationEngine['predictTaskScore'](
        targetUser,
        task,
        allUsers,
      );
      expect(predictedScore).toBe(0);
    });
  });

  describe('generateRecommendations', () => {
    it('should return a sorted list of recommended tasks', () => {
      const targetUser = createTestUser('1', []);
      const task1 = createTestTask('task1');
      const task2 = createTestTask(
        'task2',
        'afternoon',
        { start: 12, end: 18 },
        {
          id: 'area2',
          coordinates: [
            [
              [2, 2],
              [3, 3],
              [3, 2],
              [2, 2],
            ],
          ],
        },
        'type2',
      );
      const tasks = [task1, task2];
      const allUsers: User[] = [];

      const recommendations = recommendationEngine.generateRecommendations(
        targetUser,
        tasks,
        allUsers,
      );
      expect(recommendations).toBeInstanceOf(Array);
      expect(recommendations.length).toBe(2);
      expect(recommendations[0].predictedScore).toBeGreaterThanOrEqual(
        recommendations[1].predictedScore,
      );
    });
  });

  // Funciones auxiliares para crear objetos de prueba
  function createTestTask(
    id: string,
    timeRestrictionName = 'morning',
    timeRestrictionRange = { start: 6, end: 12 },
    areaProperties = {
      id: 'area1',
      coordinates: [
        [
          [0, 0],
          [1, 1],
          [1, 0],
          [0, 0],
        ],
      ],
    },
    taskType = 'type1',
  ): Task {
    const timeInterval = new TimeInterval(
      timeRestrictionName,
      [1, 2, 3, 4, 5],
      timeRestrictionRange,
      new Date('2024-01-01'),
      new Date('2024-12-31'),
    );
    const areaGeoJSON: Feature = {
      type: 'Feature',
      properties: { id: areaProperties.id },
      geometry: {
        type: 'Polygon',
        coordinates: areaProperties.coordinates,
      },
    };
    return new Task(
      id,
      `Task ${id.slice(-1)}`,
      `Description ${id.slice(-1)}`,
      'project1',
      timeInterval,
      areaGeoJSON,
      taskType,
    );
  }

  function createTestUser(
    id: string,
    checkins: Checkin[] = [],
    ratings = [],
  ): User {
    return new User(
      `User ${id}`,
      `user${id}`,
      `user${id}@example.com`,
      'password',
      null,
      true,
      UserRole.Volunteer,
      id,
      [],
      [],
      ratings,
      checkins,
    );
  }

  function createTestCheckin(id: string, task: Task): Checkin {
    return new Checkin(
      '12.34',
      '-56.78',
      new Date(),
      'project1',
      null,
      'type1',
      id,
      task,
    );
  }
});
