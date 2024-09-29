export class CreateTaskDto {
  name: string;
  description: string;
  projectId: string;
  timeIntervalId: string;
  areaId: string;
  type: string;

  constructor({ name, description, projectId, timeIntervalId, areaId, type }) {
    this.name = name;
    this.description = description;
    this.projectId = projectId;
    this.timeIntervalId = timeIntervalId;
    this.areaId = areaId;
    this.type = type;
  }

  static fromDTO({
    name,
    description,
    projectId,
    timeIntervalId,
    areaId,
    type,
  }) {
    return new CreateTaskDto({
      name,
      description,
      projectId,
      timeIntervalId,
      areaId,
      type,
    });
  }
}
