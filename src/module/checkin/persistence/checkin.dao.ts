import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CheckIn, CheckInDocument } from './checkin.schema';
import { CreateCheckinDto } from '../dto/create-checkin.dto';
import { UpdateCheckinDto } from '../dto/update-checkin.dto';

@Injectable()
export class CheckInDao {
  constructor(
    @InjectModel(CheckIn.name) private readonly checkInModel: Model<CheckInDocument>,
  ) {}

  async findAll(): Promise<CheckIn[]> {
    return this.checkInModel.find().exec();
  }

  async findOne(id: string): Promise<CheckIn> {
    const checkIn = await this.checkInModel.findById(id).exec();
    if (!checkIn) {
      throw new NotFoundException('Check-in not found');
    }
    return checkIn;
  }

  async create(createCheckInDto: CreateCheckinDto): Promise<CheckIn> {
    const checkIn = new this.checkInModel(createCheckInDto);
    return checkIn.save();
  }

  async update(id: string, updateCheckInDto: UpdateCheckinDto): Promise<CheckIn> {
    const updatedCheckIn = await this.checkInModel.findByIdAndUpdate(id, updateCheckInDto, { new: true }).exec();
    if (!updatedCheckIn) {
      throw new NotFoundException('Check-in not found');
    }
    return updatedCheckIn;
  }

  async remove(id: string): Promise<void> {
    const result = await this.checkInModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Check-in not found');
    }
  }
}
