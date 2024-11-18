export class CreateBadgeRuleDTO {
  _id: string;
  projectId: string;
  name: string;
  description: string;
  imageUrl: string;
  checkinsAmount: number;
  mustContribute: boolean;
  previousBadges: string[];
  taskType: string;
  areaId: string;
  timeIntervalId: string;
}
