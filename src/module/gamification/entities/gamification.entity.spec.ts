import {
  Gamification,
  BadgeRule,
  PointRule,
  effectiveBadgeStatus,
  isBadgeAwardable,
} from './gamification.entity';

describe('Gamification Entities', () => {
  describe('Gamification', () => {
    it('should create a Gamification instance', () => {
      const g = new Gamification('p1', [], []);
      expect(g.projectId).toBe('p1');
    });
  });

  describe('BadgeRule', () => {
    it('should create a BadgeRule instance', () => {
      const b = new BadgeRule(
        'id',
        'p1',
        'name',
        'desc',
        'img',
        10,
        true,
        [],
        'type',
        'area',
        'time',
      );
      expect(b._id).toBe('id');
      expect(b.name).toBe('name');
    });
  });

  describe('fading window', () => {
    const now = new Date('2026-06-15T12:00:00.000Z');
    const future = new Date('2026-06-20T12:00:00.000Z');
    const past = new Date('2026-06-10T12:00:00.000Z');

    it('reads a fading badge as faded while the window is open', () => {
      const badge = { status: 'faded', expiresAt: future };
      expect(effectiveBadgeStatus(badge, now)).toBe('faded');
      // Still earnable — the limited availability IS the time pressure.
      expect(isBadgeAwardable(badge, now)).toBe(true);
    });

    it('reads a fading badge as expired once the window closed', () => {
      const badge = { status: 'faded', expiresAt: past };
      expect(effectiveBadgeStatus(badge, now)).toBe('expired');
      expect(isBadgeAwardable(badge, now)).toBe(false);
    });

    it('expires exactly at the boundary, not a tick later', () => {
      const badge = { status: 'faded', expiresAt: now };
      expect(effectiveBadgeStatus(badge, now)).toBe('expired');
    });

    it('accepts an ISO string as well as a Date (JSON round-trips)', () => {
      expect(
        effectiveBadgeStatus(
          { status: 'faded', expiresAt: future.toISOString() },
          now,
        ),
      ).toBe('faded');
    });

    it('keeps a fading badge open when it has no usable window', () => {
      expect(effectiveBadgeStatus({ status: 'faded' }, now)).toBe('faded');
      expect(
        effectiveBadgeStatus({ status: 'faded', expiresAt: 'not-a-date' }, now),
      ).toBe('faded');
    });

    it('never resurrects an expired badge, whatever the dates say', () => {
      const badge = { status: 'expired', expiresAt: future };
      expect(effectiveBadgeStatus(badge, now)).toBe('expired');
      expect(isBadgeAwardable(badge, now)).toBe(false);
    });

    it('ignores a window on an active badge', () => {
      expect(
        effectiveBadgeStatus({ status: 'active', expiresAt: past }, now),
      ).toBe('active');
    });

    it('treats missing or unknown statuses as active', () => {
      expect(effectiveBadgeStatus({}, now)).toBe('active');
      expect(effectiveBadgeStatus({ status: 'pizza' }, now)).toBe('active');
    });
  });

  describe('PointRule', () => {
    it('should match correctly', () => {
      const p = new PointRule('id', 'p1', 'type1', 'area1', 'time1', 10, true);
      expect(p.matchTaskType('type1')).toBe(true);
      expect(p.matchTaskType('type2')).toBe(false);
      expect(p.matchArea('area1')).toBe(true);
      expect(p.matchArea('area2')).toBe(false);
      expect(p.matchTimeInterval('time1')).toBe(true);
      expect(p.matchTimeInterval('time2')).toBe(false);
      expect(p.mustContribute).toBe(true);
    });

    it('should match ANY_KIND', () => {
      const p = new PointRule(
        'id',
        'p1',
        'Cualquiera',
        'Cualquiera',
        'Cualquiera',
        10,
        true,
      );
      expect(p.matchTaskType('anything')).toBe(true);
      expect(p.matchArea('anything')).toBe(true);
      expect(p.matchTimeInterval('anything')).toBe(true);
    });

    it('should match task', () => {
      const p = new PointRule('id', 'p1', 'type1', 'area1', 'time1', 10, true);
      const task = {
        type: 'type1',
        areaGeoJSON: { properties: { id: 'area1' } },
        timeInterval: { name: 'time1' },
      } as any;
      expect(p.matchTask(task)).toBe(true);
    });
  });
});
