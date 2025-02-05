import { TimeInterval } from '../../task/entities/time-restriction.entity';
import { Gamification } from '../../gamification/entities/gamification.entity';
import {
  FeatureCollection,
  GamificationStrategy,
} from '../dto/create-project.dto';

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
    gamificationStrategy: GamificationStrategy,
  ) {
    this.id = id;
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
    this.gamificationStrategy = gamificationStrategy;
  }

  id: string;
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
  gamificationStrategy: GamificationStrategy;
}
