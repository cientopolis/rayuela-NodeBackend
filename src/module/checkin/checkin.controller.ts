import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CheckinService } from './checkin.service';
import { CreateCheckinDto } from './dto/create-checkin.dto';
import { UpdateCheckinDto } from './dto/update-checkin.dto';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('checkin')
export class CheckinController {
  constructor(private readonly checkinService: CheckinService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCheckinDto: CreateCheckinDto) {
    return this.checkinService.create(createCheckinDto);
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
  async update(@Param('id') id: string, @Body() updateCheckinDto: UpdateCheckinDto) {
    return this.checkinService.update(id, updateCheckinDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.checkinService.remove(id);
  }
}
