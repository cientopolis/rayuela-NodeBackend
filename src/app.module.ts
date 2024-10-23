import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './module/project/project.module';
import { AuthModule } from './module/auth/auth.module';
import { TaskModule } from './module/task/task.module';
import { CheckinModule } from './module/checkin/checkin.module';
import { VolunteerModule } from './module/volunteer/volunteer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables estén disponibles globalmente
    }),
    MongooseModule.forRoot(process.env.DB_CONNECTION as string),
    ProjectModule,
    AuthModule,
    TaskModule,
    CheckinModule,
    VolunteerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
