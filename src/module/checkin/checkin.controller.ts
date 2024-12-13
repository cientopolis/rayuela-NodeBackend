import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CheckinService } from './checkin.service';
import { CreateCheckinDto } from './dto/create-checkin.dto';
import { UpdateCheckinDto } from './dto/update-checkin.dto';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('checkin')
export class CheckinController {
  constructor(private readonly checkinService: CheckinService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCheckinDto: CreateCheckinDto, @Req() req) {
    const userId = req.user.userId;
    return this.checkinService.create(
      new CreateCheckinDto({
        latitude: createCheckinDto.latitude,
        longitude: createCheckinDto.longitude,
        datetime: createCheckinDto.datetime,
        projectId: createCheckinDto.projectId,
        userId: userId,
        taskType: createCheckinDto.taskType,
      }),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.checkinService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.checkinService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCheckinDto: UpdateCheckinDto,
  ) {
    return this.checkinService.update(id, updateCheckinDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.checkinService.remove(id);
  }
}
