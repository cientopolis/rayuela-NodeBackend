import { AreaGeoJSON, Task } from './task.entity';
import { Checkin } from '../../checkin/entities/checkin.entity';
import { TimeInterval } from './time-restriction.entity';
import { GeoUtils } from '../utils/geoUtils';

jest.mock('../utils/geoUtils'); // Mock de GeoUtils para controlar su comportamiento

describe('Task', () => {
  let task: Task;
  let taskTimeRestriction: TimeInterval;
  let area: AreaGeoJSON;
  let checkin: Checkin;

  beforeEach(() => {
    taskTimeRestriction = new TimeInterval(
      '',
      [1, 3, 5],
      {
        start: 13,
        end: 19,
      },
      new Date('01/01/2024'),
      new Date('12/31/2024'),
    ); // Lunes, Miércoles y Viernes de 13 a 19
    area = {
      type: 'Feature',
      properties: {
        cid: '',
        pos: '',
        gid: '',
        source_object: '',
        source_gna: '',
      },
      id: 'area 0',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.9876, 40.7661],
            [-73.9876, 40.7658],
            [-73.9873, 40.7658],
            [-73.9873, 40.7661],
            [-73.9876, 40.7661],
          ],
        ],
      },
    }; // Área simulada en formato GeoJSON

    task = new Task(
      'id',
      'Test Task',
      'Test Description',
      'project123',
      taskTimeRestriction,
      area,
      3,
      'type',
    );

    checkin = new Checkin(
      '40.7659',
      '-73.9875',
      new Date('2024-09-16T15:00:00'),
      'project123',
      'user123',
    );
  });

  it('should initialize with correct values', () => {
    expect(task.projectId).toBe('project123');
    expect(task.accept).toBeDefined();
  });

  describe('accept method', () => {
    it('should return true when all validations pass', () => {
      (GeoUtils.isPointInPolygon as jest.Mock).mockReturnValue(true);

      const result = task.accept(checkin);

      expect(result).toBe(true);
    });

    it('should return false if the checkin is for a different project', () => {
      checkin.projectId = 'wrongProject';

      const result = task.accept(checkin);

      expect(result).toBe(false);
    });

    it('should return false if the checkin is outside the time restriction', () => {
      // Cambiamos la fecha del checkin a una que esté fuera de las restricciones de tiempo
      checkin.date = new Date('2024-09-16T20:00:00'); // Lunes a las 20:00, fuera del rango de 13-19

      const result = task.accept(checkin);

      expect(result).toBe(false);
    });

    it('should return false if the checkin is outside the valid area', () => {
      // Mock GeoUtils.isPointInPolygon to return false for the checkin coordinates
      (GeoUtils.isPointInPolygon as jest.Mock).mockReturnValue(false);

      const result = task.accept(checkin);

      expect(result).toBe(false);
    });
  });

  describe('isSameProject method', () => {
    it('should return true if the project IDs match', () => {
      const result = (task as any).isSameProject(checkin);
      expect(result).toBe(true);
    });

    it('should return false if the project IDs do not match', () => {
      checkin.projectId = 'wrongProject';
      const result = (task as any).isSameProject(checkin);
      expect(result).toBe(false);
    });
  });

  describe('isValidTimeRestriction method', () => {
    it('should return true if the date satisfies the time restriction', () => {
      const result = (task as any).isValidTimeRestriction(checkin.date);
      expect(result).toBe(true);
    });

    it('should return false if the date does not satisfy the time restriction', () => {
      checkin.date = new Date('2024-09-16T20:00:00'); // Lunes a las 20:00, fuera del rango
      const result = (task as any).isValidTimeRestriction(checkin.date);
      expect(result).toBe(false);
    });
  });

  describe('idValidArea method', () => {
    it('should return true if the checkin is inside the valid area', () => {
      (GeoUtils.isPointInPolygon as jest.Mock).mockReturnValue(true);
      const result = (task as any).isValidArea(checkin);
      expect(result).toBe(true);
    });

    it('should return false if the checkin is outside the valid area', () => {
      (GeoUtils.isPointInPolygon as jest.Mock).mockReturnValue(false);
      const result = (task as any).isValidArea(checkin);
      expect(result).toBe(false);
    });
  });
});
