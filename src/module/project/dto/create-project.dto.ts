import { TimeInterval } from '../../task/entities/time-restriction.entity';

export class CreateProjectDto {
  name: string;
  description?: string;
  image: string;
  web?: string;
  available: boolean;
  areas: any;
  taskTypes: string[];
  timeIntervals: TimeInterval[];
}
