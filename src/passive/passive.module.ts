import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passive } from './passive.entity';
import { PassiveService } from './passive.service';
import { PassiveController } from './passive.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Passive])],
  providers: [PassiveService],
  controllers: [PassiveController],
})
export class PassiveModule {}
