import { Module } from '@nestjs/common';
import { CheckinService } from './checkin.service';
import { CheckinController } from './checkin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { CheckInSchema } from './persistence/checkin.schema';
import { CheckInDao } from './persistence/checkin.dao';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'CheckIn', schema: CheckInSchema }]), AuthModule, TaskModule],
  controllers: [CheckinController],
  providers: [CheckinService, CheckInDao],
})
export class CheckinModule {}
