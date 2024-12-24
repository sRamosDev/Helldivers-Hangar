import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Helmet } from './helmet.entity';
import { Passive } from '../passive/passive.entity';
import { HelmetService } from './helmet.service';
import { HelmetController } from './helmet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Helmet, Passive])],
  providers: [HelmetService],
  controllers: [HelmetController],
})
export class HelmetModule {}