import { Module } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardController } from './leaderboard.controller';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Leaderboard,
  LeaderboardSchema,
} from './persistence/leaderboard-user-schema';
import { LeaderboardDao } from './persistence/leaderboard.dao';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Leaderboard.name, schema: LeaderboardSchema },
    ]),
    AuthModule,
  ],
  controllers: [LeaderboardController],
  providers: [LeaderboardService, LeaderboardDao],
  exports: [LeaderboardService, LeaderboardDao],
})
export class LeaderboardModule {}
