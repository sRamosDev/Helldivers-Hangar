import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeaponService } from './weapon.service';
import { Weapon } from './weapon.entity';
import { Trait } from '../trait/trait.entity';
import { FiringMode } from '../firingMode/firingMode.entity';
import { AuthModule } from '../auth/auth.module';
import { WeaponController } from './weapon.controller';
import { AzureStorageUtil } from '../utils/azure-storage.util';

@Module({
  imports: [TypeOrmModule.forFeature([Weapon, Trait, FiringMode]), AuthModule],
  controllers: [WeaponController],
  providers: [WeaponService, AzureStorageUtil],
})
export class WeaponModule {}
