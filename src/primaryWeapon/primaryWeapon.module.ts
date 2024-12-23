import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrimaryWeapon } from './primaryWeapon.entity';
import { PrimaryWeaponService } from './primaryWeapon.service';
import { PrimaryWeaponController } from './primaryWeapon.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PrimaryWeapon])],
  providers: [PrimaryWeaponService],
  controllers: [PrimaryWeaponController],
})
export class PrimaryWeaponModule {}
