import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectTemplate, ProjectSchema } from './persistence/project.schema';
import { ProjectDao } from './persistence/project.dao';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProjectTemplate.collectionName(), schema: ProjectSchema },
    ]),
    AuthModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectDao],
  exports: [ProjectService, ProjectDao],
})
export class ProjectModule {}
