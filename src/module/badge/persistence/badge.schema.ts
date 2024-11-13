import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BadgeDocument = BadgeTemplate & Document;

@Schema()
export class BadgeTemplate {
  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  projectId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true, min: 1 })
  checkinsAmount: number;

  @Prop({ required: true })
  mustContribute: boolean;

  @Prop({ type: [String], default: [] })
  previousBadges: string[];

  @Prop({ required: true })
  taskType: string;

  @Prop({ required: true })
  areaId: string;

  @Prop({ required: true })
  timeIntervalId: string;

  static collectionName() {
    return 'Badges';
  }
}

export const BadgeSchema = SchemaFactory.createForClass(BadgeTemplate);
