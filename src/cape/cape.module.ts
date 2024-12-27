import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cape } from './cape.entity';
import { CapeService } from './cape.service';
import { CapeController } from './cape.controller';
import { Passive } from '../passive/passive.entity';
import { AuthModule } from '../auth/auth.module';
import { ActivityLogModule } from '../activity-log/activity-log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cape, Passive]),
    AuthModule,
    ActivityLogModule,
  ],
  providers: [CapeService],
  controllers: [CapeController],
})
export class CapeModule {}
