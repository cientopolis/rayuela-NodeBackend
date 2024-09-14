import { Checkin } from './checkin.entity';

describe('Checkin Class', () => {
  let checkin: Checkin;
  const latitude = '12.345';
  const longitude = '67.890';
  const datetime = new Date('2024-09-14T12:00:00Z');
  const projectId = 'project123';
  const userId = 'user123';
  const taskId = 'task123';

  beforeEach(() => {
    checkin = new Checkin(
      latitude,
      longitude,
      datetime,
      projectId,
      userId,
      taskId,
    );
  });

  it('should initialize with correct values', () => {
    expect(checkin.latitude).toBe(latitude);
    expect(checkin.longitude).toBe(longitude);
    expect(checkin.date).toBe(datetime);
    expect(checkin.projectId).toBe(projectId);
    expect(checkin.userId).toBe(userId);
    expect(checkin.taskId).toBe(taskId);
    expect(checkin.canContribute).toBe(false); // Por defecto, canContribute debería ser false
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
    expect(checkin.taskId).toBe(taskId);
  });

  it('should allow contribution after validateContribution is called', () => {
    expect(checkin.canContribute).toBe(false); // Por defecto debería ser false
    checkin.validateContribution();
    expect(checkin.canContribute).toBe(true); // Después de llamar a validateContribution, debería ser true
  });
});
