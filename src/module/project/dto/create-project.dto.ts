import { TimeInterval } from '../../task/entities/time-restriction.entity';

export class CreateProjectDto {
  name: string;
  description?: string;
  image: string;
  web?: string;
  available: boolean;
  areas: FeatureCollection;
  taskTypes: string[];
  timeIntervals: TimeInterval[];
  ownerId: string;
}

export interface FeatureCollection {
  type: 'FeatureCollection';
  features: Feature[];
}

export interface Feature {
  type: string;
  properties: Record<string, any>;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}
