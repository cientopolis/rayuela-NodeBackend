import { Project } from '../../project/entities/project';
import { Checkin } from './checkin.entity';
import { Task } from '../../task/entities/task.entity';
import { User } from '../../auth/users/user.entity';
import { BadgeRule } from '../../gamification/entities/gamification.entity';

export interface PointsEngine {
  reward(ch: Checkin, project: Project): number;
}

export interface BadgeEngine {
  newBadgesFor(u: User, ch: Checkin, project: Project): BadgeRule[]; // Badge's names
}

export interface LeaderboardUser {
  _id: string;
  username: string;
  completeName: string;
  points: number;
  badges: string[];
}

export interface LeaderboardEngine {
  build(usersList: User[], u: User, project: Project): LeaderboardUser[];
}

export interface GameStatus {
  newBadges: BadgeRule[];
  newLeaderboard: LeaderboardUser[];
  newPoints: number;
}

export class Game {
  private leaderboardEngine: LeaderboardEngine;
  private project: Project;
  private pointsEngine: PointsEngine;
  private badgeEngine: BadgeEngine;
  private tasks: Task[];
  private users: User[];

  constructor(
    project: Project,
    pointsEngine: PointsEngine,
    badgeEngine: BadgeEngine,
    leaderboardEngine: LeaderboardEngine,
    tasks: Task[],
    users: User[],
  ) {
    this.project = project;
    this.pointsEngine = pointsEngine;
    this.badgeEngine = badgeEngine;
    this.leaderboardEngine = leaderboardEngine;
    this.tasks = tasks;
    this.users = users;
  }

  play(checkin: Checkin): GameStatus {
    const newPoints = this.pointsEngine.reward(checkin, this.project);
    checkin.user.addPointsFromProject(newPoints, this.project._id);
    return {
      newBadges: this.badgeEngine.newBadgesFor(
        checkin.user,
        checkin,
        this.project,
      ),
      newPoints,
      newLeaderboard: this.leaderboardEngine.build(
        this.users,
        checkin.user,
        this.project,
      ),
    };
  }
}

export class GameBuilder {
  private leaderboardEngine: LeaderboardEngine | null = null;
  private project: Project | null = null;
  private pointsEngine: PointsEngine | null = null;
  private badgeEngine: BadgeEngine | null = null;
  private tasks: Task[] | null = null;
  private users: User[] | null = null;

  withLeaderboardEngine(leaderboardEngine: LeaderboardEngine): this {
    this.leaderboardEngine = leaderboardEngine;
    return this;
  }

  withProject(project: Project): this {
    this.project = project;
    return this;
  }

  withPointsEngine(pointsEngine: PointsEngine): this {
    this.pointsEngine = pointsEngine;
    return this;
  }

  withBadgeEngine(badgeEngine: BadgeEngine): this {
    this.badgeEngine = badgeEngine;
    return this;
  }

  withTasks(tasks: Task[]): this {
    this.tasks = tasks;
    return this;
  }

  withUsers(users: User[]): this {
    this.users = users;
    return this;
  }

  build(): Game {
    if (
      !this.project ||
      !this.pointsEngine ||
      !this.badgeEngine ||
      !this.leaderboardEngine
    ) {
      throw new Error(
        'All dependencies must be provided before building the Game instance',
      );
    }
    return new Game(
      this.project,
      this.pointsEngine,
      this.badgeEngine,
      this.leaderboardEngine,
      this.tasks,
      this.users,
    );
  }
}
