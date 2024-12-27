import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LoadoutsService } from './loadouts.service';
import { Loadout } from './loadout.entity';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';

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

  @Get(':uniqueId')
  async findOne(@Param('uniqueId') uniqueId: string): Promise<Loadout> {
    return this.loadoutsService.findOne(uniqueId);
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
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
