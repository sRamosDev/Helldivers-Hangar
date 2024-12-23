import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trait } from './trait.entity';
import { TraitService } from './trait.service';
import { TraitController } from './trait.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Trait])],
  providers: [TraitService],
  controllers: [TraitController],
})
export class TraitModule {}
