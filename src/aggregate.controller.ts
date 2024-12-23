import { Controller, Get } from '@nestjs/common';
import { PrimaryWeaponService } from './primaryWeapon/primaryWeapon.service';
import { SecondaryWeaponService } from './secondaryWeapon/secondaryWeapon.service';
import { ThrowableService } from './throwable/throwable.service';
import { HelmetService } from './helmet/helmet.service';
import { ArmorService } from './armor/armor.service';
import { CapeService } from './cape/cape.service';
import { FiringModeService } from './firingMode/firingMode.service';
import { TraitService } from './trait/trait.service';
import { PassiveService } from './passive/passive.service';

@Controller('all')
export class AggregateController {
  constructor(
    private readonly primaryWeaponService: PrimaryWeaponService,
    private readonly secondaryWeaponService: SecondaryWeaponService,
    private readonly throwableService: ThrowableService,
    private readonly helmetService: HelmetService,
    private readonly armorService: ArmorService,
    private readonly capeService: CapeService,
    private readonly firingModeService: FiringModeService,
    private readonly traitService: TraitService,
    private readonly passiveService: PassiveService,
  ) {}

  @Get()
  async getAllData() {
    const primaryWeapons = await this.primaryWeaponService.findAll();
    const secondaryWeapons = await this.secondaryWeaponService.findAll();
    const throwables = await this.throwableService.findAll();
    const helmets = await this.helmetService.findAll();
    const armors = await this.armorService.findAll();
    const capes = await this.capeService.findAll();
    const firingModes = await this.firingModeService.findAll();
    const traits = await this.traitService.findAll();
    const passives = await this.passiveService.findAll();

    return {
      primaryWeapons,
      secondaryWeapons,
      throwables,
      helmets,
      armors,
      capes,
      firingModes,
      traits,
      passives,
    };
  }
}
