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

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  projectId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Task', required: true })
  taskId: Types.ObjectId;

  @Prop({ required: true, type: Boolean })
  canContribute: boolean;

  constructor(
    latitude: string,
    longitude: string,
    datetime: Date,
    projectId: string,
    userId: string,
    taskId: string,
    canContribute: boolean,
  ) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.datetime = datetime;
    this.projectId = new Types.ObjectId(projectId);
    this.userId = new Types.ObjectId(userId);
    this.taskId = new Types.ObjectId(taskId);
    this.canContribute = canContribute;
  }

  static collectionName() {
    return 'Checkin';
  }
}

export const CheckInSchema = SchemaFactory.createForClass(CheckInTemplate);
