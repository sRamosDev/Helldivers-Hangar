import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiringMode } from './firingMode.entity';
import { FiringModeService } from './firingMode.service';
import { FiringModeController } from './firingMode.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FiringMode])],
  providers: [FiringModeService],
  controllers: [FiringModeController],
})
export class FiringModeModule {}
