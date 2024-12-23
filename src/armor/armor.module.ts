import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Armor } from './armor.entity';
import { ArmorService } from './armor.service';
import { ArmorController } from './armor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Armor])],
  providers: [ArmorService],
  controllers: [ArmorController],
})
export class ArmorModule {}
