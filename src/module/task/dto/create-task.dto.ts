export enum TaskTimeRestriction {
  WEEKEND="Fin de semana",
  WEEKDAYS="Dias de semana",
}

export class CreateTaskDto {
  name: string;
  description: string;
  projectId: string;
  timeRestriction: TaskTimeRestriction;
  areaId: string;
  checkinAmount: number;
}
