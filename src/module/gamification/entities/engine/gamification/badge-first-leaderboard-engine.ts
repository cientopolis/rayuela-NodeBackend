import {
  LeaderboardEngine,
  LeaderboardUser,
} from '../../../../checkin/entities/game.entity';
import { User } from '../../../../auth/users/user.entity';
import { Project } from '../../../../project/entities/project';
import { LeaderboardStrategy } from '../../../../project/dto/create-project.dto';

export function mapLeaderboardUser(u: User, project: Project) {
  return (us) => {
    if (us.id.toString() === u.id.toString()) {
      return {
        username: u.username,
        _id: u.id,
        points: u.getGameProfileFromProject(project.id).points,
        badges: u.getGameProfileFromProject(project.id).badges,
        completeName: u.completeName,
      };
    } else {
      return {
        username: us.username,
        _id: us.id,
        points: us.getGameProfileFromProject(project.id).points,
        badges: us.getGameProfileFromProject(project.id).badges,
        completeName: us.completeName,
      };
    }
  };
}

export class BadgesFirstLBEngine implements LeaderboardEngine {
  private sortCriteria = (project) => (a, b) => {
    const profileA = a.getGameProfileFromProject(project.id);
    const profileB = b.getGameProfileFromProject(project.id);

    // Criterio primario: ordenar por cantidad de insignias (descendente)
    const badgeDifference = profileB.badges.length - profileA.badges.length;
    if (badgeDifference !== 0) {
      return badgeDifference;
    }

    // Criterio secundario: si las insignias son iguales, ordenar por puntos (descendente)
    return profileB.points - profileA.points;
  };

  assignableTo(project: Project): boolean {
    // A leaderboard engine is picked by the *leaderboard* strategy, the way
    // its sibling PointsFirstLBEngine does. This used to read
    // `gamificationStrategy === BASIC`, a copy-paste from the badge/points
    // engines: it answered true for any basic project regardless of its
    // leaderboard setting, and false for every elastic one that had
    // explicitly chosen badges-first.
    return project.leaderboardStrategy === LeaderboardStrategy.BADGES_FIRST;
  }

  build(usersList: User[], u: User, project: Project): LeaderboardUser[] {
    return usersList
      .sort(this.sortCriteria(project))
      .map(mapLeaderboardUser(u, project));
  }
}
