import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CheckInDocument = CheckInTemplate & Document;

@Schema()
export class CheckInTemplate {
  @Prop({ required: true, maxlength: 500 })
  latitude: string;

  @Prop({ required: true, maxlength: 500 })
  longitude: string;

  @Prop({ required: true, type: Date })
  datetime: Date;

  @Prop({ ref: 'Project', required: true })
  projectId: Types.ObjectId;

  @Prop({ ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: String })
  contributesTo: string;

  constructor(
    latitude: string,
    longitude: string,
    datetime: Date,
    projectId: string,
    userId: string,
    contributesTo: string,
  ) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.datetime = datetime;
    this.projectId = new Types.ObjectId(projectId);
    this.userId = new Types.ObjectId(userId);
    this.contributesTo = contributesTo;
  }

  static collectionName() {
    return 'Checkin';
  }
}

export const CheckInSchema = SchemaFactory.createForClass(CheckInTemplate);
