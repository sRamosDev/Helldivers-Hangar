import { Controller, Get } from '@nestjs/common';
import { WeaponService } from './weapon/weapon.service';
import { ThrowableService } from './throwable/throwable.service';
import { GearService } from './gear/gear.service';
import { FiringModeService } from './firingMode/firingMode.service';
import { TraitService } from './trait/trait.service';
import { PassiveService } from './passive/passive.service';

@Controller('all')
export class AggregateController {
  constructor(
    private readonly weaponService: WeaponService,
    private readonly throwableService: ThrowableService,
    private readonly gearService: GearService,
    private readonly firingModeService: FiringModeService,
    private readonly traitService: TraitService,
    private readonly passiveService: PassiveService,
  ) {}

  @Get()
  async getAllData() {
    const weapons = await this.weaponService.findAll();
    const throwables = await this.throwableService.findAll();
    const gear = await this.gearService.findAll();

    const firingModes = await this.firingModeService.findAll();
    const traits = await this.traitService.findAll();
    const passives = await this.passiveService.findAll();

    return {
      weapons,
      throwables,
      gear,
      firingModes,
      traits,
      passives,
    };
  }
}
