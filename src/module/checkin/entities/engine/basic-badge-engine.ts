import { BadgeEngine } from '../game.entity';
import { User } from '../../../auth/users/user.entity';
import { Checkin } from '../checkin.entity';
import { Project } from '../../../project/entities/project';
import { BadgeRule } from '../../../gamification/entities/gamification.entity';
import { BadRequestException } from '@nestjs/common';
import { TimeInterval } from '../../../task/entities/time-restriction.entity';
import { GeoUtils } from '../../../task/utils/geoUtils';

export class BasicBadgeEngine implements BadgeEngine {
  newBadgesFor(u: User, ch: Checkin, project: Project): BadgeRule[] {
    return project.gamification.badgesRules.filter(
      (r) =>
        this.ruleMatch(r, ch, project, u) &&
        !u
          .getGameProfileFromProject(project._id)
          .badges.find((b) => b === r.name),
    );
  }

  private ruleMatch(r: BadgeRule, checkin: Checkin, project: Project, u: User) {
    return (
      this.userHasPreviousBadges(r, u) &&
      (r.mustContribute
        ? this.matchTaskType(r, checkin, project) &&
          this.matchTimeInterval(r, checkin, project) &&
          this.matchArea(r, checkin, project)
        : true)
    );
  }

  private matchTaskType(r: BadgeRule, checkin: Checkin, project: Project) {
    return (
      r.taskType === 'Cualquiera' ||
      (checkin.taskType === r.taskType &&
        project.taskTypes.includes(r.taskType))
    );
  }

  private matchTimeInterval(r: BadgeRule, checkin: Checkin, project: Project) {
    if (r.timeIntervalId === 'Cualquiera') {
      return true;
    }
    const timeInterval = this.getTimeInterval(r, project);
    return timeInterval.satisfy(checkin.date);
  }

  private getTimeInterval(r: BadgeRule, project: Project): TimeInterval {
    const interval = project.timeIntervals.find(
      (ti) => r.timeIntervalId === ti.name,
    );
    if (!interval) {
      throw new BadRequestException(
        'Error during badge assignation in time interval ' + r.timeIntervalId,
      );
    }
    return new TimeInterval(
      interval.name,
      interval.days,
      interval.time,
      interval.startDate,
      interval.endDate,
    );
  }

  private matchArea(r: BadgeRule, checkin: Checkin, project: Project) {
    if (r.areaId === 'Cualquiera') {
      return true;
    }
    const polygon = project.areas.features.find(
      (f) => f.properties.id == r.areaId,
    );
    return (
      polygon &&
      GeoUtils.isPointInPolygon(
        parseFloat(checkin.longitude),
        parseFloat(checkin.latitude),
        polygon.geometry,
      )
    );
  }

  private userHasPreviousBadges(r: BadgeRule, u: User) {
    return r.previousBadges.every((b) => u.hasBadgeWithName(b));
  }
}
