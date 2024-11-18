import { TimeInterval } from '../../task/entities/time-restriction.entity';
import { Gamification } from '../../badge/entities/badge.entity';
import { FeatureCollection } from '../dto/create-project.dto';

export class Project {
  constructor(
    id: string,
    name: string,
    description: string,
    image: string,
    web: string,
    available: boolean,
    areas: FeatureCollection,
    taskTypes: string[],
    timeIntervals: TimeInterval[],
    ownerId: string,
    gamification: Gamification,
  ) {
    this._id = id;
    this.name = name;
    this.description = description;
    this.image = image;
    this.web = web;
    this.available = available;
    this.areas = areas;
    this.taskTypes = taskTypes;
    this.timeIntervals = timeIntervals;
    this.ownerId = ownerId;
    this.gamification = gamification;
  }
  _id: string;
  name: string;
  description: string;
  image: string;
  web: string;
  available: boolean;
  areas: FeatureCollection;
  taskTypes: string[];
  timeIntervals: TimeInterval[];
  ownerId: string;
  gamification: Gamification;
}
