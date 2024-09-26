import { Checkin } from '../../checkin/entities/checkin.entity';
import { GeoUtils } from '../utils/geoUtils';
import { TimeInterval } from './time-restriction.entity';

export interface AreaGeoJSON {
  id: string;
  type: 'Feature';
  properties: FeatureProperties;
  geometry: Geometry;
}

interface FeatureProperties {
  cid: string;
  pos: string;
  gid: string;
  source_object: string;
  source_gna: string;
}

interface Geometry {
  type: 'Polygon';
  coordinates: number[][][]; // Array de coordenadas para el polígono
}

export class Task {
  get projectId(): string {
    return this.#projectId;
  }
  getId(): string {
    return this.#_id;
  }
  #_id: string;
  #name: string;
  #description: string;
  #projectId: string;
  #timeInterval: TimeInterval;
  #areaGeoJSON: AreaGeoJSON;
  #checkinAmount: number;
  #type: string;

  constructor(
    id: string,
    name: string,
    description: string,
    projectId: string,
    timeRestriction: TimeInterval,
    area: AreaGeoJSON,
    checkinAmount: number,
    type: string,
  ) {
    this.#_id = id;
    this.#name = name;
    this.#description = description;
    this.#projectId = projectId;
    this.#timeInterval = timeRestriction;
    this.#areaGeoJSON = area;
    this.#checkinAmount = checkinAmount;
    this.#type = type;
  }

  accept(checkin: Checkin) {
    const validations = [
      this.isSameProject(checkin),
      this.isValidTimeRestriction(checkin.date),
      this.isValidArea(checkin),
    ];
    return validations.every((v) => v);
  }

  private isValidTimeRestriction(date: Date): boolean {
    const isValid = this.#timeInterval.satisfy(date);
    !isValid &&
      console.log(
        `[VALIDATION] Date ${date} is not valid for restriction: ${this.#timeInterval}`,
      );
    return isValid;
  }

  private isSameProject(checkin: Checkin) {
    const isValid = checkin.projectId === this.#projectId;
    !isValid &&
      console.log(
        `[VALIDATION] Projects mismatch between ${checkin.projectId} and ${this.#projectId}`,
      );
    return isValid;
  }

  private isValidArea(checkin: Checkin) {
    const isValid = GeoUtils.isPointInPolygon(
      parseFloat(checkin.longitude),
      parseFloat(checkin.latitude),
      this.#areaGeoJSON.geometry,
    );
    !isValid &&
      console.log(
        `[VALIDATION] Point out of area ${checkin.latitude} ${checkin.longitude} and ${JSON.stringify(this.#areaGeoJSON.geometry)}`,
      );
    return isValid;
  }
}
