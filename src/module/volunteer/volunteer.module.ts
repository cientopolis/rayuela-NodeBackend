import { Module } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { VolunteerController } from './volunteer.controller';
import { ProjectModule } from '../project/project.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [VolunteerController],
  providers: [VolunteerService],
  imports: [ProjectModule, AuthModule],
})
export class VolunteerModule {}
