import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cape } from './cape.entity';
import { CapeService } from './cape.service';
import { CapeController } from './cape.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cape])],
  providers: [CapeService],
  controllers: [CapeController],
})
export class CapeModule {}
