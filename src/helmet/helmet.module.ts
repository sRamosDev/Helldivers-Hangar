import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Helmet } from './helmet.entity';
import { HelmetService } from './helmet.service';
import { HelmetController } from './helmet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Helmet])],
  providers: [HelmetService],
  controllers: [HelmetController],
})
export class HelmetModule {}
