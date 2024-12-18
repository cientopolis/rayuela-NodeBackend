import { Checkin } from './checkin.entity';
import { User } from '../../auth/users/user.entity';
import { Task } from '../../task/entities/task.entity';

export class Move {
  private checkin: Checkin;
  private points: number;
  private rate: number;
  private contributesTo: Task;

  constructor(user: User, checkin: Checkin, tasks: Task[]) {
    this.checkin = checkin;
    this.rate = 0; // 0 means no valuation
    this.contributesTo = this.evaluateContributions(tasks, checkin);
    this.points = this.calculatePoints(user, checkin);
  }

  private evaluateContributions(tasks: Task[], checkin: Checkin) {
    return tasks.find((task) => task.accept(checkin)) || null;
  }

  private calculatePoints(user: User, checkin: Checkin) {
    return 10;
  }
}
