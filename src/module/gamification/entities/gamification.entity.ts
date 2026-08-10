import { Task } from '../../task/entities/task.entity';

/**
 * Lifecycle of a badge rule under the community fading strategy
 * (see `desvanecimiento-comunitario-medallas-diseno.md` §3):
 *
 *   active  → awarded normally.
 *   faded   → still awarded, but only until `expiresAt`. That limited
 *             availability *is* the time pressure the strategy relies on,
 *             so a fading badge stays earnable for the whole window.
 *   expired → no longer awarded to anyone new. Never deleted: whoever
 *             already earned it keeps it and the rule stays visible in the
 *             dependency graph for admins and collaborators alike.
 *
 * Declared as a const object rather than a TS `enum` so `Object.values`
 * feeds `ParseEnumPipe` directly while the exported type stays a plain
 * string union (what the schema, DTOs and mobile payloads all speak).
 */
export const BadgeStatus = {
  Active: 'active',
  Faded: 'faded',
  Expired: 'expired',
} as const;

export type BadgeStatus = (typeof BadgeStatus)[keyof typeof BadgeStatus];

/** Shape needed to resolve a status — accepts entities and raw Mongo/JSON rows. */
export interface BadgeFadingWindow {
  status?: string;
  expiresAt?: Date | string | null;
}

/**
 * Resolves the status a badge *actually* has right now.
 *
 * The `faded → expired` transition is derived from the clock instead of
 * being written by a scheduled job: a stored `expiresAt` in the past always
 * reads as `expired`. No `@nestjs/schedule` dependency, nothing to drift
 * across restarts, and no window where half the rows have been migrated.
 *
 * ponytail: derived, not persisted. If the strategy later needs to *emit*
 * something at the moment a badge expires (an awareness event, a push),
 * that needs a real job — this function stays the source of truth and the
 * job just records what it already says.
 */
export function effectiveBadgeStatus(
  badge: BadgeFadingWindow,
  now: Date = new Date(),
): BadgeStatus {
  // Unknown/missing status means `active`, matching the schema default and
  // the `status || 'active'` fallback the DAO and the mobile DTO already use.
  if (
    badge.status !== BadgeStatus.Faded &&
    badge.status !== BadgeStatus.Expired
  ) {
    return BadgeStatus.Active;
  }
  if (badge.status === BadgeStatus.Expired) {
    return BadgeStatus.Expired;
  }

  const expiresAt = badge.expiresAt ? new Date(badge.expiresAt) : null;
  // ponytail: a `faded` rule with no usable window never expires on its own —
  // an admin has to close it. Always hand `expiresAt` in when marking a badge
  // as fading so runs stay idempotent.
  if (!expiresAt || Number.isNaN(expiresAt.getTime())) {
    return BadgeStatus.Faded;
  }
  return expiresAt.getTime() <= now.getTime()
    ? BadgeStatus.Expired
    : BadgeStatus.Faded;
}

/** True while the rule can still be handed out — `active`, or `faded` mid-window. */
export function isBadgeAwardable(
  badge: BadgeFadingWindow,
  now: Date = new Date(),
): boolean {
  return effectiveBadgeStatus(badge, now) !== BadgeStatus.Expired;
}

export class Gamification {
  constructor(
    projectId: string,
    badgesRules: BadgeRule[],
    pointRules: PointRule[],
  ) {
    this.projectId = projectId;
    this.badgesRules = badgesRules;
    this.pointRules = pointRules;
  }

  projectId: string;
  badgesRules: BadgeRule[];
  pointRules: PointRule[];
}

export class BadgeRule {
  constructor(
    id: string,
    projectId: string,
    name: string,
    description: string,
    imageUrl: string,
    checkinsAmount: number,
    mustContribute: boolean,
    previousBadges: string[],
    taskType: string,
    areaId: string,
    timeIntervalId: string,
    status = 'active',
    fadedSince?: Date,
    expiresAt?: Date,
    fadeReason?: string,
  ) {
    this._id = id;
    this.projectId = projectId;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.checkinsAmount = checkinsAmount;
    this.mustContribute = mustContribute;
    this.previousBadges = previousBadges;
    this.taskType = taskType;
    this.areaId = areaId;
    this.timeIntervalId = timeIntervalId;
    this.status = status;
    this.fadedSince = fadedSince;
    this.expiresAt = expiresAt;
    this.fadeReason = fadeReason;
  }

  _id: string;
  projectId: string;
  name: string;
  description: string;
  imageUrl: string;
  checkinsAmount: number;
  mustContribute: boolean;
  previousBadges: string[];
  taskType: string;
  areaId: string;
  timeIntervalId: string;
  status: string;

  /** When the rule entered `faded`. Audit trail; not used for the transition. */
  fadedSince?: Date;
  /** End of the fading window. Past this instant the rule reads as `expired`. */
  expiresAt?: Date;
  /** Human-readable motive shown alongside the countdown. */
  fadeReason?: string;
}

export class PointRule {
  get mustContribute(): boolean {
    return this._mustContribute;
  }
  _id: string;
  projectId: string;
  taskType: string;
  areaId: string;
  timeIntervalId: string;
  score: number;
  private _mustContribute: boolean;

  constructor(
    id: string,
    projectId: string,
    taskType: string,
    areaId: string,
    timeIntervalId: string,
    score: number,
    mustContribute: boolean,
  ) {
    this._id = id;
    this.projectId = projectId;
    this.taskType = taskType;
    this.areaId = areaId;
    this.timeIntervalId = timeIntervalId;
    this.score = score;
    this._mustContribute = mustContribute;
  }

  matchTimeInterval(timeIntervalId: string) {
    return (
      this.timeIntervalId === timeIntervalId || this.timeIntervalId === ANY_KIND
    );
  }

  matchArea(areaId: string) {
    return this.areaId === areaId || this.areaId === ANY_KIND;
  }

  matchTaskType(taskType: string) {
    return this.taskType === taskType || this.taskType === ANY_KIND;
  }

  matchTask(task: Task) {
    return (
      this.matchTaskType(task.type) &&
      this.matchArea(task.areaGeoJSON?.properties?.id?.toString()) &&
      this.matchTimeInterval(task.timeInterval.name.toString())
    );
  }
}

const ANY_KIND = 'Cualquiera';
