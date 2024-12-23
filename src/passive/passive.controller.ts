import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PassiveService } from './passive.service';
import { Passive } from './passive.entity';

@Controller('passives')
export class PassiveController {
  constructor(private readonly passiveService: PassiveService) {}

  @Get()
  findAll(): Promise<Passive[]> {
    return this.passiveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Passive> {
    return this.passiveService.findOne(id);
  }

  @Post()
  create(@Body() passive: Passive): Promise<Passive> {
    return this.passiveService.create(passive);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() passive: Passive): Promise<Passive> {
    return this.passiveService.update(id, passive);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.passiveService.remove(id);
  }
}
