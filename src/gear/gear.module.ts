import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gear } from './gear.entity';
import { Passive } from '../passive/passive.entity';
import { GearService } from './gear.service';
import { GearController } from './gear.controller';
import { AuthModule } from '../auth/auth.module';
import { AzureStorageUtil } from '../utils/azure-storage.util';

@Module({
  imports: [TypeOrmModule.forFeature([Gear, Passive]), AuthModule],
  providers: [GearService, AzureStorageUtil],
  controllers: [GearController],
})
export class GearModule {}
