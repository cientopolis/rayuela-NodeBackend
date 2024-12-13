import { Injectable } from '@nestjs/common';
import { CheckinService } from '../checkin/checkin.service';
import { UserService } from '../auth/users/user.service';

@Injectable()
export class LeaderboardService {
  constructor(
    private checkinService: CheckinService,
    private userService: UserService,
  ) {}

  async getLeaderboardFor(projectId: string, userId: any) {
    console.log(userId);
    const checkins = await this.checkinService.findByProjectId(projectId);
    const points = {};
    for (const checkin of checkins) {
      if (points[checkin.userId.toString()]) {
        points[checkin.userId.toString()]++;
      } else {
        points[checkin.userId.toString()] = 1;
      }
    }
    const leaderboard = [];
    Object.keys(points).map((uid) =>
      leaderboard.push({ userId: uid, points: points[uid] }),
    );
    leaderboard.sort((a, b) => a.points - a.points - b.points);
    const result = [];
    for (const el of leaderboard) {
      const user = await this.userService.getByUserId(el.userId);
      result.push({ user, points: el.points });
    }
    return result.slice(0,10);
  }
}
