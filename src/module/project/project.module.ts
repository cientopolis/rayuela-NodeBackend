import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './persistence/project.schema';
import { ProjectDao } from './persistence/project.dao';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }])],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectDao],
})
export class ProjectModule {
}
