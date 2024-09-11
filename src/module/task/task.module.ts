import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { TaskDao } from './persistence/task.dao';
import { TaskSchema } from './persistence/task.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]), AuthModule],
  controllers: [TaskController],
  providers: [TaskService, TaskDao],
})
export class TaskModule {}
