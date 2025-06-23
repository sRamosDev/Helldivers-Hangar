import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Throwable } from './throwable.entity';
import { ThrowableService } from './throwable.service';
import { ThrowableController } from './throwable.controller';
import { Trait } from '../trait/trait.entity';
import { AuthModule } from '../auth/auth.module';
import { AzureStorageUtil } from '../utils/azure-storage.util';

@Module({
  imports: [TypeOrmModule.forFeature([Throwable, Trait]), AuthModule],
  providers: [ThrowableService, AzureStorageUtil],
  controllers: [ThrowableController],
})
export class ThrowableModule {}
