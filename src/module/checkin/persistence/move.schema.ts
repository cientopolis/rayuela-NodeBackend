import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ScoreRate } from '../entities/move.entity';

export type MoveDocument = MoveTemplate & Document;

@Schema()
export class MoveTemplate {
  @Prop({ ref: 'Checkin', required: true, type: String })
  checkinId: string;

  @Prop({ ref: 'User', required: true, type: String })
  userId: string;

  @Prop({ type: Number, enum: ScoreRate, default: ScoreRate.NO_RATE })
  score: ScoreRate;

  @Prop({ type: Date, default: Date.now })
  timestamp: Date;

  @Prop({ type: [String], default: [] })
  newBadges: string[];

  @Prop({ type: Number, default: 0 })
  newPoints: number;

  constructor(
    checkin: string,
    userId: string,
    score: ScoreRate = ScoreRate.NO_RATE,
    timestamp: Date = new Date(),
    newBadges: string[] = [],
    newPoints: number = 0,
  ) {
    this.checkinId = checkin;
    this.userId = userId;
    this.score = score;
    this.timestamp = timestamp;
    this.newBadges = newBadges;
    this.newPoints = newPoints;
  }

  static collectionName() {
    return 'Moves';
  }
}

export const MoveSchema = SchemaFactory.createForClass(MoveTemplate);
