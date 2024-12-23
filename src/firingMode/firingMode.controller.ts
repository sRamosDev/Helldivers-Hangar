import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FiringModeService } from './firingMode.service';
import { FiringMode } from './firingMode.entity';

@Controller('firing-modes')
export class FiringModeController {
  constructor(private readonly firingModeService: FiringModeService) {}

  @Get()
  findAll(): Promise<FiringMode[]> {
    return this.firingModeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<FiringMode> {
    return this.firingModeService.findOne(id);
  }

  @Post()
  create(@Body() firingMode: FiringMode): Promise<FiringMode> {
    return this.firingModeService.create(firingMode);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() firingMode: FiringMode,
  ): Promise<FiringMode> {
    return this.firingModeService.update(id, firingMode);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.firingModeService.remove(id);
  }
}
