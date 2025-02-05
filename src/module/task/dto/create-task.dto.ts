export class CreateTaskDto {
  name: string;
  description: string;
  projectId: string;
  timeIntervalId: string;
  areaId: string;
  type: string;
  solved: boolean = false;

  constructor({
    name,
    description,
    projectId,
    timeIntervalId,
    areaId,
    type,
    solved,
  }) {
    this.name = name;
    this.description = description;
    this.projectId = projectId;
    this.timeIntervalId = timeIntervalId;
    this.areaId = areaId;
    this.type = type;
    this.solved = solved;
  }

  static fromDTO({
    name,
    description,
    projectId,
    timeIntervalId,
    areaId,
    type,
    solved,
  }) {
    return new CreateTaskDto({
      name,
      description,
      projectId,
      timeIntervalId,
      areaId,
      type,
      solved,
    });
  }
}
