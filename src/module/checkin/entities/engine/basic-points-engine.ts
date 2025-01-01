import { PointsEngine } from '../game.entity';
import { Task } from '../../../task/entities/task.entity';
import { Checkin } from '../checkin.entity';

export class BasicPointsEngine implements PointsEngine {
  reward(list: Task[], ch: Checkin): number {
    console.log(list, ch);
    return 1;
  }
}
