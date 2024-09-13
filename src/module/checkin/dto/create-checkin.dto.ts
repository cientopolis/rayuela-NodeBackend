import { Checkin } from '../entities/checkin.entity';

export class CreateCheckinDto {
  latitude: string;
  longitude: string;
  datetime: Date;
  projectId: string;
  userId: string;
  taskId: string;

  toDomain() {
    return new Checkin(
      this.latitude,
      this.longitude,
      this.datetime,
      this.projectId,
      this.userId,
      this.taskId
    );
  }
}
