import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weapon } from './weapon.entity';
import { WeaponService } from './weapon.service';
import { WeaponController } from './weapon.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Weapon])],
  providers: [WeaponService],
  controllers: [WeaponController],
})
export class WeaponModule {}
