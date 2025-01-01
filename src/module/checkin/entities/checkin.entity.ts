import { CreateCheckinDto } from '../dto/create-checkin.dto';
import { User } from '../../auth/users/user.entity';

export class Checkin {
  set contributesTo(value: string) {
    this.#contributesTo = value;
  }

  set id(value: string) {
    this.#id = value;
  }

  get id(): string {
    return this.#id;
  }

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

  get user(): User {
    return this.#user;
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
  #user: User;
  #contributesTo: string;
  #taskType: string;
  #id: string;

  constructor(
    latitude: string,
    longitude: string,
    datetime: Date,
    projectId: string,
    user: User,
    taskType: string,
    id: string,
  ) {
    this.#latitude = latitude;
    this.#longitude = longitude;
    this.#date = datetime;
    this.#projectId = projectId;
    this.#user = user;
    this.#taskType = taskType;
    this.#contributesTo = '';
    this.#id = id;
  }

  validateContribution(id: string): void {
    this.#contributesTo = id;
  }

  static fromDTO(createCheckinDto: CreateCheckinDto, user: User): Checkin {
    return new Checkin(
      createCheckinDto.latitude,
      createCheckinDto.longitude,
      createCheckinDto.datetime,
      createCheckinDto.projectId,
      user,
      createCheckinDto.taskType,
      '',
    );
  }
}
