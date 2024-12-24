import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cape } from './cape.entity';
import { CapeService } from './cape.service';
import { CapeController } from './cape.controller';
import { Passive } from '../passive/passive.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cape, Passive])],
  providers: [CapeService],
  controllers: [CapeController],
})
export class CapeModule {}
