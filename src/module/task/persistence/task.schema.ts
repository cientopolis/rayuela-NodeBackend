import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TaskTimeRestriction } from '../entities/time-restriction.entity';

export type TaskDocument = TaskSchemaTemplate & Document;

@Schema()
export class TaskSchemaTemplate {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  projectId: Types.ObjectId;

  @Prop({
    required: true,
    type: {
      days: { type: [Number], required: true }, // Lista de números para los días (1 a 7)
      time: {
        start: { type: Number, required: true, min: 0, max: 23 }, // Hora de inicio
        end: { type: Number, required: true, min: 0, max: 23 }, // Hora de fin
      },
    },
  })
  timeRestriction: TaskTimeRestriction; // Se embebe la estructura de TaskTimeRestriction

  @Prop({ type: Types.ObjectId, ref: 'Area', required: true })
  areaId: Types.ObjectId;

  @Prop({ required: true, min: 1 })
  checkinAmount: number;

  @Prop({ required: true })
  type: string;

  static collectionName() {
    return 'Task';
  }
}

export const TaskSchema = SchemaFactory.createForClass(TaskSchemaTemplate);
