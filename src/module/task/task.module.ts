import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { TaskDao } from './persistence/task.dao';
import { TaskSchema, TaskSchemaTemplate } from './persistence/task.schema';
import { ProjectModule } from '../project/project.module';
import { LeaderboardModule } from '../leaderboard/leaderboard.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskSchemaTemplate.collectionName(), schema: TaskSchema },
    ]),
    AuthModule,
    ProjectModule,
    LeaderboardModule,
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskDao],
  exports: [TaskService],
})
export class TaskModule {}
