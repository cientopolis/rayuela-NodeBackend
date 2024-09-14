export class Checkin {
  set date(value: Date) {
    this.#date = value;
  }
  set projectId(value: string) {
    this.#projectId = value;
  }
  get canContribute(): boolean {
    return this.#canContribute;
  }
  get taskId(): string {
    return this.#taskId;
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
  #taskId: string;
  #canContribute: boolean;

  constructor(
    latitude: string,
    longitude: string,
    datetime: Date,
    projectId: string,
    userId: string,
    taskId: string,
  ) {
    this.#latitude = latitude;
    this.#longitude = longitude;
    this.#date = datetime;
    this.#projectId = projectId;
    this.#userId = userId;
    this.#taskId = taskId;
    this.#canContribute = false;
  }

  validateContribution(): void {
    this.#canContribute = true;
  }
}
