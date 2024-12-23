import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecondaryWeapon } from './secondaryWeapon.entity';
import { SecondaryWeaponService } from './secondaryWeapon.service';
import { SecondaryWeaponController } from './secondaryWeapon.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SecondaryWeapon])],
  providers: [SecondaryWeaponService],
  controllers: [SecondaryWeaponController],
})
export class SecondaryWeaponModule {}
