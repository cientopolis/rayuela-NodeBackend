import { CreateCheckinDto } from '../dto/create-checkin.dto';

export class Checkin {
  get taskType(): string {
    return this.#taskType;
  }
  set date(value: Date) {
    this.#date = value;
  }
  set projectId(value: string) {
    this.#projectId = value;
  }
  get contributesTo(): string {
    return this.#contributesTo;
  }
  get userId(): string {
    return this.#userId;
  }
  get longitude(): string {
    return this.#longitude;
  }
  get latitude(): string {
    return this.#latitude;
  }
  get projectId(): string {
    return this.#projectId;
  }
  get date(): Date {
    return this.#date;
  }
  #latitude: string;
  #longitude: string;
  #date: Date;
  #projectId: string;
  #userId: string;
  #contributesTo: string;
  #taskType: string;

  constructor(
    latitude: string,
    longitude: string,
    datetime: Date,
    projectId: string,
    userId: string,
    taskType: string,
  ) {
    this.#latitude = latitude;
    this.#longitude = longitude;
    this.#date = datetime;
    this.#projectId = projectId;
    this.#userId = userId;
    this.#taskType = taskType;
    this.#contributesTo = '';
  }

  validateContribution(id: string): void {
    this.#contributesTo = id;
  }

  static fromDTO(createCheckinDto: CreateCheckinDto) {
    return new Checkin(
      createCheckinDto.latitude,
      createCheckinDto.longitude,
      createCheckinDto.datetime,
      createCheckinDto.projectId,
      createCheckinDto.userId,
      createCheckinDto.taskType,
    );
  }
}
