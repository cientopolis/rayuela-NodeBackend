import { TimeInterval } from '../../task/entities/time-restriction.entity';
import { Badge } from '../../badge/entities/badge.entity';
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
    possibleBadges: Badge[],
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
    this.possibleBadges = possibleBadges;
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
  possibleBadges: Badge[];
}
