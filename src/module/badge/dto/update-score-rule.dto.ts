import { PartialType } from '@nestjs/mapped-types';
import { CreateScoreRuleDto } from './create-score-rule-dto';

export class UpdateScoreRuleDto extends PartialType(CreateScoreRuleDto) {}
