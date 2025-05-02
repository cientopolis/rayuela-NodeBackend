import { Task } from '../../task/entities/task.entity';

export class Gamification {
  constructor(
    projectId: string,
    badgesRules: BadgeRule[],
    pointRules: PointRule[],
  ) {
    this.projectId = projectId;
    this.badgesRules = badgesRules;
    this.pointRules = pointRules;
  }

  projectId: string;
  badgesRules: BadgeRule[];
  pointRules: PointRule[];
}

export class BadgeRule {
  constructor(
    id: string,
    projectId: string,
    name: string,
    description: string,
    imageUrl: string,
    checkinsAmount: number,
    mustContribute: boolean,
    previousBadges: string[],
    taskType: string,
    areaId: string,
    timeIntervalId: string,
  ) {
    this._id = id;
    this.projectId = projectId;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.checkinsAmount = checkinsAmount;
    this.mustContribute = mustContribute;
    this.previousBadges = previousBadges;
    this.taskType = taskType;
    this.areaId = areaId;
    this.timeIntervalId = timeIntervalId;
  }

  _id: string;
  projectId: string;
  name: string;
  description: string;
  imageUrl: string;
  checkinsAmount: number;
  mustContribute: boolean;
  previousBadges: string[];
  taskType: string;
  areaId: string;
  timeIntervalId: string;
}

export class PointRule {
  _id: string;
  projectId: string;
  taskType: string;
  areaId: string;
  timeIntervalId: string;
  score: number;
  mustContribute: boolean;

  constructor(
    id: string,
    projectId: string,
    taskType: string,
    areaId: string,
    timeIntervalId: string,
    score: number,
    mustContribute: boolean,
  ) {
    this._id = id;
    this.projectId = projectId;
    this.taskType = taskType;
    this.areaId = areaId;
    this.timeIntervalId = timeIntervalId;
    this.score = score;
    this.mustContribute = mustContribute;
  }

  matchTimeInterval(timeIntervalId: string) {
    return (
      this.timeIntervalId === timeIntervalId || this.timeIntervalId === ANY_KIND
    );
  }

  matchArea(areaId: string) {
    return this.areaId === areaId || this.areaId === ANY_KIND;
  }

  matchTaskType(taskType: string) {
    return this.taskType === taskType || this.taskType === ANY_KIND;
  }

  matchTask(task: Task) {
    return (
      this.matchTaskType(task.type) &&
      this.matchArea(task.areaGeoJSON.properties.id.toString()) &&
      this.matchTimeInterval(task.timeInterval.name.toString())
    );
  }
}

const ANY_KIND = 'Cualquiera';
