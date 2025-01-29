import { Module } from '@nestjs/common';
import { GamificationService } from './gamification.service';
import { GamificationController } from './gamificationController';
import { MongooseModule } from '@nestjs/mongoose';
import {
  GamificationTemplate,
  GamificationTemplateSchema,
} from './persistence/gamification.schema';
import { GamificationDao } from './persistence/gamification-dao.service';
import { AuthModule } from '../auth/auth.module';
import { LeaderboardModule } from '../leaderboard/leaderboard.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GamificationTemplate.collectionName(),
        schema: GamificationTemplateSchema,
      },
    ]),
    AuthModule,
    LeaderboardModule,
  ],
  exports: [GamificationService, GamificationDao],
  controllers: [GamificationController],
  providers: [GamificationService, GamificationDao],
})
export class GamificationModule {}
