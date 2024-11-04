export class CreateBadgeDto {
  projectId: string;
  name: string;
  description: string;
  imageUrl: string;
  checkinsAmount: number;
  previousBadges: string[];
  taskType: string;
  areaId: string;
  timeIntervalId: string;
}
