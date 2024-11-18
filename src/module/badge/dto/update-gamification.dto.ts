import { UpdateBadgeRuleDTO } from './update-badge-rule-d-t.o';

export class UpdateGamificationDto {
  projectId: string;
  badgesRules: UpdateBadgeRuleDTO[];
  pointRules: UpdatePointRuleDto[];
}

export class UpdatePointRuleDto {}
