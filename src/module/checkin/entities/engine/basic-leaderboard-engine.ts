import { LeaderboardEngine, LeaderboardUser } from '../game.entity';
import { User } from '../../../auth/users/user.entity';
import { Project } from '../../../project/entities/project';

export class BasicLeaderbardEngine implements LeaderboardEngine {
  build(usersList: User[], u: User, project: Project): LeaderboardUser[] {
    return usersList
      .sort(
        (a, b) =>
          b.getGameProfileFromProject(project._id).points -
          a.getGameProfileFromProject(project._id).points,
      )
      .map((us) => {
        if (us.id.toString() === u.id.toString()) {
          return {
            username: u.username,
            _id: u.id,
            points: u.getGameProfileFromProject(project._id).points,
            badges: u.getGameProfileFromProject(project._id).badges,
            completeName: u.completeName,
          };
        } else {
          return {
            username: us.username,
            _id: us.id,
            points: us.getGameProfileFromProject(project._id).points,
            badges: us.getGameProfileFromProject(project._id).badges,
            completeName: us.completeName,
          };
        }
      });
  }
}
