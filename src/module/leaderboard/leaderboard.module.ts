import { Module } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardController } from './leaderboard.controller';
import { CheckinModule } from '../checkin/checkin.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [CheckinModule, AuthModule],
  controllers: [LeaderboardController],
  providers: [LeaderboardService],
})
export class LeaderboardModule {}
