import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { TaskDao } from './persistence/task.dao';
import { TaskSchema } from './persistence/task.schema';
import { ProjectService } from '../project/project.service';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]), AuthModule, ProjectModule],
  controllers: [TaskController],
  providers: [TaskService, TaskDao, ProjectService],
  exports: [TaskService],
})
export class TaskModule {}
