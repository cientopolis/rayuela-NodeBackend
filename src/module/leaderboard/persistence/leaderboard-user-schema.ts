import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LeaderboardDocument = Leaderboard & Document;

@Schema()
export class LeaderboardUser {
  @Prop({ required: true })
  _id: string; // Identificador único del usuario

  @Prop({ required: true })
  username: string; // Nombre de usuario único

  @Prop({ required: true })
  completeName: string; // Nombre completo del usuario

  @Prop({ required: true, default: 0 })
  points: number; // Puntos del usuario

  @Prop({ type: [String], default: [] })
  badges: string[]; // Lista de insignias del usuario
}

@Schema()
export class Leaderboard {
  @Prop({ required: true, unique: true })
  projectId: string; // Identificador único del proyecto

  @Prop({ required: true, default: Date.now })
  lastUpdated: Date; // Fecha de última actualización

  @Prop({ type: [LeaderboardUser], default: [] })
  users: LeaderboardUser[]; // Lista de usuarios del leaderboard
}

export const LeaderboardSchema = SchemaFactory.createForClass(Leaderboard);

// Configuración adicional, si es necesaria
LeaderboardSchema.statics.collectionName = function () {
  return 'Leaderboards';
};
