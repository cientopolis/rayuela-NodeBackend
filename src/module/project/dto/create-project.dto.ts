import { AreaGeoJSON } from '../../task/entities/task.entity';

export class CreateProjectDto {
  name: string;
  description?: string;
  image: string;
  web?: string;
  available: boolean;
  areas: AreaGeoJSON[];
  taskTypes: string[];
}
