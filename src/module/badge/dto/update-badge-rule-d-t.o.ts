import { PartialType } from '@nestjs/swagger';
import { CreateBadgeRuleDTO } from './create-badge-rule-d-t.o';

export class UpdateBadgeRuleDTO extends PartialType(CreateBadgeRuleDTO) {}
