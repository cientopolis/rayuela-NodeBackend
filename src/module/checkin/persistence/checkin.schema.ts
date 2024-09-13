import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CheckInDocument = CheckIn & Document;

@Schema()
export class CheckIn {
  @Prop({ required: true, type: String, auto: true })
  id: string;

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
}

export const CheckInSchema = SchemaFactory.createForClass(CheckIn);
