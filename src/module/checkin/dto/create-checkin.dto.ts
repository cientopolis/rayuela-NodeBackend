import { Checkin } from '../entities/checkin.entity';

export class CreateCheckinDto {
  latitude: string;
  longitude: string;
  datetime: Date;
  projectId: string;
  userId: string;

  constructor({ datetime, latitude, projectId, userId, longitude }) {
    this.datetime = datetime;
    this.latitude = latitude;
    this.longitude = longitude;
    this.userId = userId;
    this.projectId = projectId;
  }

  toDomain() {
    return new Checkin(
      this.latitude,
      this.longitude,
      this.datetime,
      this.projectId,
      this.userId,
    );
  }
}
