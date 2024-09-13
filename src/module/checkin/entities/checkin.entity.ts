export class Checkin {
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
  #taskId: string;

  constructor(latitude: string, longitude: string, datetime: Date, projectId: string, userId: string, taskId: string) {
    this.#latitude = latitude;
    this.#longitude = longitude;
    this.#date = datetime;
    this.#projectId = projectId;
    this.#userId = userId;
    this.#taskId = taskId;
  }

}
