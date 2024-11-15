import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GamificationService } from './gamification.service';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';

@Controller('gamification')
export class GamificationController {
  constructor(private readonly badgeService: GamificationService) {}

  @Post()
  create(@Body() createBadgeDto: CreateBadgeDto) {
    return this.badgeService.create(createBadgeDto);
  }

  @Get('project/:projectId')
  findAll(@Param('projectId') projectId: string) {
    return this.badgeService.findAllByProjectId(projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.badgeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBadgeDto: UpdateBadgeDto) {
    return this.badgeService.update(id, updateBadgeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.badgeService.remove(id);
  }
}
