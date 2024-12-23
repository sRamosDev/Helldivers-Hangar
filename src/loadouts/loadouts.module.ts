import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loadout } from './loadout.entity';
import { LoadoutsController } from './loadouts.controller';
import { LoadoutsService } from './loadouts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Loadout])],
  controllers: [LoadoutsController],
  providers: [LoadoutsService],
})
export class LoadoutsModule {}
