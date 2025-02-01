import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiringMode } from './firingMode.entity';
import { FiringModeService } from './firingMode.service';
import { FiringModeController } from './firingMode.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([FiringMode]), AuthModule],
  providers: [FiringModeService],
  controllers: [FiringModeController],
})
export class FiringModeModule {}
