import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Throwable } from './throwable.entity';
import { ThrowableService } from './throwable.service';
import { ThrowableController } from './throwable.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Throwable])],
  providers: [ThrowableService],
  controllers: [ThrowableController],
})
export class ThrowableModule {}
