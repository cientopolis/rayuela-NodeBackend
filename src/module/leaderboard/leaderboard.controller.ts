import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:projectId')
  leaderboard(@Param('projectId') projectId: string, @Req() req) {
    const userId = req.user.userId;
    return this.leaderboardService.getLeaderboardFor(projectId, userId);
  }
}
