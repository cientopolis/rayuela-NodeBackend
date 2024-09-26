import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CheckInTemplate, CheckInDocument } from './checkin.schema';
import { UpdateCheckinDto } from '../dto/update-checkin.dto';
import { Checkin } from '../entities/checkin.entity';

@Injectable()
export class CheckInDao {
  constructor(
    @InjectModel(CheckInTemplate.collectionName())
    private readonly checkInModel: Model<CheckInDocument>,
  ) {}

  async findAll(): Promise<CheckInTemplate[]> {
    return this.checkInModel.find().exec();
  }

  async findOne(id: string): Promise<CheckInTemplate> {
    const checkIn = await this.checkInModel.findById(id).exec();
    if (!checkIn) {
      throw new NotFoundException('Check-in not found');
    }
    return checkIn;
  }

  async create(checkin: Checkin): Promise<CheckInTemplate> {
    const checkinDB = this.mapCheckinDB(checkin);
    const checkIn = new this.checkInModel(checkinDB);
    return checkIn.save();
  }

  async update(
    id: string,
    updateCheckInDto: UpdateCheckinDto,
  ): Promise<CheckInTemplate> {
    const updatedCheckIn = await this.checkInModel
      .findByIdAndUpdate(id, updateCheckInDto, { new: true })
      .exec();
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

  private mapCheckinDB(checkin: Checkin): CheckInTemplate {
    return new CheckInTemplate(
      checkin.latitude,
      checkin.longitude,
      checkin.date,
      checkin.projectId,
      checkin.userId,
      checkin.contributesTo,
    );
  }
}
