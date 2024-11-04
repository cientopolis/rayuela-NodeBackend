import { Module } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { BadgeController } from './badge.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BadgeSchema, BadgeTemplate } from './persistence/badge.schema';
import { BadgeDao } from './persistence/badge.dao';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BadgeTemplate.collectionName(), schema: BadgeSchema },
    ]),
    AuthModule,
  ],
  controllers: [BadgeController],
  providers: [BadgeService, BadgeDao],
})
export class BadgeModule {}
