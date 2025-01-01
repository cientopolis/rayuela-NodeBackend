import { LeaderboardEngine } from '../game.entity';
import { User } from '../../../auth/users/user.entity';

export class BasicLeaderbardEngine implements LeaderboardEngine {
  build(usersList: User[], newPoints: number, u: User): User[] {
    console.log(usersList, newPoints, u);
    return [];
  }
}
