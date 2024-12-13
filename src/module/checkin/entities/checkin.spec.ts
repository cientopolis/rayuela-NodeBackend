import { Checkin } from './checkin.entity';

describe('Checkin Class', () => {
  let checkin: Checkin;
  const latitude = '12.345';
  const longitude = '67.890';
  const datetime = new Date('2024-09-14T12:00:00Z');
  const projectId = 'project123';
  const userId = 'user123';

  beforeEach(() => {
    checkin = new Checkin(
      latitude,
      longitude,
      datetime,
      projectId,
      userId,
      'tasktype',
    );
  });

  it('should initialize with correct values', () => {
    expect(checkin.latitude).toBe(latitude);
    expect(checkin.longitude).toBe(longitude);
    expect(checkin.date).toBe(datetime);
    expect(checkin.projectId).toBe(projectId);
    expect(checkin.userId).toBe(userId);
  });

  it('should return the correct latitude and longitude', () => {
    expect(checkin.latitude).toBe(latitude);
    expect(checkin.longitude).toBe(longitude);
  });

  it('should return the correct date', () => {
    expect(checkin.date).toBe(datetime);
  });

  it('should return the correct projectId, userId, and taskId', () => {
    expect(checkin.projectId).toBe(projectId);
    expect(checkin.userId).toBe(userId);
  });
});
