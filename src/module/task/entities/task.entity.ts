import { TaskTimeRestriction } from '../dto/create-task.dto';
import { Checkin } from '../../checkin/entities/checkin.entity';
import { Polygon } from 'geojson';
import { GeoUtils } from '../geoUtils';

export class Task {
  #name: string;
  #description: string;
  #projectId: string;
  #timeRestriction: TaskTimeRestriction;
  #areaGeoJSON: Polygon;
  #checkinAmount: number;

  constructor(name: string, description: string, projectId: string, timeRestriction: TaskTimeRestriction, area: Polygon, checkinAmount: number) {
    this.#name = name;
    this.#description = description;
    this.#projectId = projectId;
    this.#timeRestriction = timeRestriction;
    this.#areaGeoJSON = area;
    this.#checkinAmount = checkinAmount;
  }

  accept(checkin: Checkin) {
    const validations = [
      this.isSameProject(checkin),
      this.isValidTimeRestriction(checkin.date),
      this.idValidArea(checkin),
    ]
    return validations.every(Boolean);
  }

  private isValidTimeRestriction(date: Date): boolean {
    return this.#timeRestriction.satisfy(date);
  }

  private isSameProject(checkin: Checkin) {
    return checkin.projectId === this.#projectId;
  }

  private idValidArea(checkin: Checkin) {
    return GeoUtils.isPointInPolygon(parseFloat(checkin.latitude), parseFloat(checkin.longitude), this.#areaGeoJSON);
  }
}
