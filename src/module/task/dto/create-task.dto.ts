import { AreaGeoJSON, Task } from '../entities/task.entity';
import { TaskTimeRestriction } from '../entities/time-restriction.entity';

export class CreateTaskDto {
  name: string;
  description: string;
  projectId: string;
  timeRestriction: TaskTimeRestriction;
  areaId: string;
  checkinAmount: number;

  constructor({
    name,
    description,
    projectId,
    timeRestriction,
    areaId,
    checkinAmount,
  }) {
    this.name = name;
    this.description = description;
    this.projectId = projectId;
    this.timeRestriction = timeRestriction;
    this.areaId = areaId;
    this.checkinAmount = checkinAmount;
  }

  toDomain(area: AreaGeoJSON): Task {
    return new Task(
      this.name,
      this.description,
      this.projectId,
      this.timeRestriction,
      area,
      this.checkinAmount,
    );
  }

  static fromDTO({
    name,
    description,
    projectId,
    timeRestriction,
    areaId,
    checkinAmount,
  }) {
    return new CreateTaskDto({
      name,
      description,
      projectId,
      timeRestriction,
      areaId,
      checkinAmount,
    });
  }
}
