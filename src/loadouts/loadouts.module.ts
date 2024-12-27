import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loadout } from './loadout.entity';
import { LoadoutsController } from './loadouts.controller';
import { LoadoutsService } from './loadouts.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Loadout]), AuthModule],
  controllers: [LoadoutsController],
  providers: [LoadoutsService],
})
export class LoadoutsModule {}
