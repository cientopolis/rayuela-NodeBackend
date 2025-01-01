import { Injectable } from '@nestjs/common';
import { CreateCheckinDto } from './dto/create-checkin.dto';
import { UpdateCheckinDto } from './dto/update-checkin.dto';
import { CheckInDao } from './persistence/checkin.dao';
import { TaskService } from '../task/task.service';
import { Task } from '../task/entities/task.entity';
import { Checkin } from './entities/checkin.entity';
import { UserService } from '../auth/users/user.service';
import { Move } from './entities/move.entity';
import { GameBuilder } from './entities/game.entity';
import { BasicPointsEngine } from './entities/engine/basic-points-engine';
import { BasicBadgeEngine } from './entities/engine/basic-badge-engine';
import { BasicLeaderbardEngine } from './entities/engine/basic-leaderboard-engine';
import { ProjectService } from '../project/project.service';
import { MoveDao } from './persistence/move.dao';

@Injectable()
export class CheckinService {
  constructor(
    private readonly checkInDao: CheckInDao,
    private readonly moveDao: MoveDao,
    private readonly taskService: TaskService,
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
  ) {}

  async create(createCheckinDto: CreateCheckinDto) {
    const tasks: Task[] = await this.taskService.findByProjectId(
      createCheckinDto.projectId,
    );
    const user = await this.userService.getByUserId(createCheckinDto.userId);
    const users = await this.userService.findAllByProjectId(
      createCheckinDto.projectId,
    );
    const checkin = Checkin.fromDTO(createCheckinDto, user);
    const project = await this.projectService.findOne(
      createCheckinDto.projectId,
    );

    checkin.contributesTo = tasks.find((t) => t.accept(checkin))?.getId();
    const game = new GameBuilder()
      .withPointsEngine(new BasicPointsEngine())
      .withBadgeEngine(new BasicBadgeEngine())
      .withLeaderboardEngine(new BasicLeaderbardEngine())
      .withTasks(tasks)
      .withUsers(users)
      .withProject(project)
      .build();
    const gameStatus = game.play(checkin);
    const move = new Move(checkin, gameStatus);

    user.addBadges(gameStatus.newBadges);
    user.addPoints(gameStatus.newPoints);

    await this.userService.update(user.id, user);
    const c = await this.checkInDao.create(checkin);
    checkin.id = c['_id'];
    await this.moveDao.create(move);
    const contribution = tasks.find(
      (t) => t.getId() === move.checkin.contributesTo,
    );
    return {
      ...move,
      contributesTo: contribution && {
        name: contribution.name,
        id: contribution.getId(),
      },
    };
  }

  async findAll() {
    return this.checkInDao.findAll();
  }

  async findOne(id: string) {
    return this.checkInDao.findOne(id);
  }

  async update(id: string, updateCheckinDto: UpdateCheckinDto) {
    return this.checkInDao.update(id, updateCheckinDto);
  }

  async remove(id: string) {
    return this.checkInDao.remove(id);
  }

  findByProjectId(projectId: string) {
    return this.checkInDao.findByProjectId(projectId);
  }
}
