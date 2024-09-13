import { Task } from '../entities/task.entity';
import { Polygon } from 'geojson';
import { area } from '@turf/turf';
import { name } from 'eslint-plugin-prettier';

export class TaskTimeRestriction {
  days: number[]; // From 1 to 7
  time: { // Between 00 and 23
    start: number,
    end: number,
  }

  satisfy(date: Date): boolean {
    const dayOfWeek = (date.getDay() === 0) ? 7 : date.getDay();

    const hour = date.getHours();

    const isValidDay = this.days.includes(dayOfWeek);

    const isValidHour = hour >= this.time.start && hour < this.time.end;

    return isValidDay && isValidHour;
  }
}

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

  toDomain(area: Polygon): Task {
    return new Task(this.name,this.description,this.projectId,this.timeRestriction,area,this.checkinAmount);
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
    })
  }
}
