export class CreateTaskDto {
  name: string;
  description: string;
  projectId: string;
  timeIntervalId: string;
  areaId: string;
  checkinAmount: number;
  type: string;

  constructor({
    name,
    description,
    projectId,
    timeIntervalId,
    areaId,
    checkinAmount,
    type,
  }) {
    this.name = name;
    this.description = description;
    this.projectId = projectId;
    this.timeIntervalId = timeIntervalId;
    this.areaId = areaId;
    this.checkinAmount = checkinAmount;
    this.type = type;
  }

  static fromDTO({
    name,
    description,
    projectId,
    timeIntervalId,
    areaId,
    checkinAmount,
    type,
  }) {
    return new CreateTaskDto({
      name,
      description,
      projectId,
      timeIntervalId,
      areaId,
      checkinAmount,
      type,
    });
  }
}
