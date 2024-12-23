// src/loadouts/loadouts.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LoadoutsService } from './loadouts.service';
import { Loadout } from './loadout.entity';

@Controller('loadouts')
export class LoadoutsController {
  constructor(private readonly loadoutsService: LoadoutsService) {}

  @Post()
  async create(
    @Body()
    loadoutData: {
      name: string;
      helmetId: number;
      armorId: number;
      capeId: number;
      primaryWeaponId: number;
      secondaryWeaponId: number;
      throwableId: number;
    },
  ) {
    return this.loadoutsService.create(loadoutData);
  }

  @Get()
  async findAll(): Promise<Loadout[]> {
    return this.loadoutsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Loadout> {
    return this.loadoutsService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    loadoutData: {
      name: string;
      helmetId: number;
      armorId: number;
      capeId: number;
      primaryWeaponId: number;
      secondaryWeaponId: number;
      throwableId: number;
    },
  ) {
    return this.loadoutsService.update(+id, loadoutData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.loadoutsService.remove(+id);
  }
}
