import { UserRole } from './user.schema';
import { Checkin } from '../../checkin/entities/checkin.entity';
import { Task } from '../../task/entities/task.entity';

export interface GameProfile {
  projectId: string;
  points: number;
  badges: string[]; //badge name
  active: boolean;
}

export interface UserRating {
  score: number;
  checkinId: string;
  taskId: string;
}

export class User {
  get ratings(): UserRating[] {
    return this._ratings;
  }

  set ratings(value: UserRating[]) {
    this._ratings = value;
  }

  get resetToken(): string {
    return this._resetToken;
  }

  set resetToken(value: string) {
    this._resetToken = value;
  }

  get checkinsWithTask(): string[] {
    return this._checkinsWithTask;
  }

  get gameProfiles(): GameProfile[] {
    return this._gameProfiles;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  private _completeName: string;
  private _username: string;
  private _email: string;
  private _password: string;
  private _profileImage: string | null;
  private _verified: boolean;
  private _role: UserRole;
  private _id: string;
  private _gameProfiles: GameProfile[];
  private _checkinsWithTask: string[];
  private _resetToken: string;
  private _ratings: UserRating[];

  constructor(
    completeName: string,
    username: string,
    email: string,
    password: string,
    profileImage: string | null = null,
    verified: boolean = false,
    role: UserRole = UserRole.Volunteer,
    id?: string,
    gameProfiles: GameProfile[] = [],
    contributions: string[] = [],
    ratings: UserRating[] = [],
  ) {
    this._completeName = completeName;
    this._username = username;
    this._email = email;
    this._password = password;
    this._profileImage = profileImage;
    this._verified = verified;
    this._role = role;
    this._id = id;
    this._gameProfiles = gameProfiles;
    this._checkinsWithTask = contributions;
    this._ratings = ratings;
  }

  // Getters

  get password(): string {
    return this._password;
  }

  get completeName(): string {
    return this._completeName;
  }

  get username(): string {
    return this._username;
  }

  get email(): string {
    return this._email;
  }

  get profileImage(): string | null {
    return this._profileImage;
  }

  get verified(): boolean {
    return this._verified;
  }

  get role(): UserRole {
    return this._role;
  }

  // Setters
  set completeName(value: string) {
    this._completeName = value;
  }

  set username(value: string) {
    this._username = value;
  }

  set email(value: string) {
    this._email = value;
  }

  set profileImage(value: string | null) {
    this._profileImage = value;
  }

  set verified(value: boolean) {
    this._verified = value;
  }

  set role(value: UserRole) {
    this._role = value;
  }

  verifyAccount(): void {
    this._verified = true;
  }

  addBadgeFromProject(badges: string[], projectId: string) {
    badges.forEach((b) => {
      this.getGameProfileFromProject(projectId).badges.push(b);
    });
  }

  getGameProfileFromProject(projectId: string) {
    return this.gameProfiles.find((gp) => gp.projectId === projectId);
  }

  hasBadgeWithName(name: string) {
    return !!this.gameProfiles.find((gp) => gp.badges.includes(name));
  }

  addProject(projectId: string) {
    let gameProfile = this.getGameProfileFromProject(projectId);
    if (!gameProfile) {
      this.gameProfiles.push({
        projectId: projectId,
        points: 0,
        badges: [],
        active: true,
      });
    } else {
      gameProfile = this.getGameProfileFromProject(projectId);
      gameProfile.active = !gameProfile.active;
    }
  }

  addPointsFromProject(newPoints: number, projectId: string) {
    this.getGameProfileFromProject(projectId).points += newPoints;
  }

  addContribution(taskId: string) {
    this.checkinsWithTask.push(taskId);
  }

  removeProject(projectId: string) {
    this._gameProfiles = this.gameProfiles.map((gp) => {
      if (gp.projectId === projectId) {
        gp.active = false;
      }
      return gp;
    });
  }

  isSubscribedToProject(projectId: string) {
    return Boolean(
      this.gameProfiles.find((gp) => gp.projectId === projectId && gp.active),
    );
  }

  unsubscribeFromProject(projectId: string) {
    this._gameProfiles = this.gameProfiles.map((gp) => {
      return {
        ...gp,
        active: gp.projectId === projectId ? false : gp.active,
      };
    });
  }

  addRating(checkin: Checkin, score: number) {
    this.ratings.push({
      checkinId: checkin.id,
      taskId: checkin.contributesTo,
      score,
    });
  }

  getRatingForTaskId(taskId: string) {
    return this.ratings.find((r) => r.taskId === taskId)?.score;
  }

  subscribeToProject(projectId: string) {
    if (!this.isSubscribedToProject(projectId)) {
      this._gameProfiles.push({
        projectId: projectId,
        points: 0,
        badges: [],
        active: true,
      });
    } else {
      this._gameProfiles = this.gameProfiles.map((gp) => {
        return {
          ...gp,
          active: gp.projectId === projectId ? true : gp.active,
        };
      });
    }
  }
}
