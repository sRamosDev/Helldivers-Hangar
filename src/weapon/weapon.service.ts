import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Weapon } from './weapon.entity';
import { CreateWeaponDto } from './dto/createWeapon.dto';
import { Trait } from '../trait/trait.entity';
import { FiringMode } from '../firingMode/firingMode.entity';
import { UpdateWeaponDto } from './dto/updateWeapon.dto';

@Injectable()
export class WeaponService {
  constructor(
    @InjectRepository(Weapon)
    private readonly weaponRepository: Repository<Weapon>,
    @InjectRepository(Trait)
    private readonly traitRepository: Repository<Trait>,
    @InjectRepository(FiringMode)
    private readonly fireModeRepository: Repository<FiringMode>,
  ) {}

  async updateImageUrl(id: number, imageUrl: string): Promise<Weapon> {
    const weapon = await this.verifyWeaponExists(id);
    return this.weaponRepository.save({ ...weapon, image_url: imageUrl });
  }

  async create(createDto: CreateWeaponDto): Promise<Weapon> {
    const traits = await this.validateTraits(createDto.traits);
    const firing_modes = await this.validateFiringMode(createDto.firing_modes);

    const weapon = this.weaponRepository.create({
      ...createDto,
      traits: traits,
      firing_modes: firing_modes,
    });

    return this.weaponRepository.save(weapon);
  }

  async findAll(): Promise<Weapon[]> {
    return this.weaponRepository.find();
  }

  async findOne(id: number): Promise<Weapon> {
    return this.weaponRepository.findOne({ where: { id } });
  }

  async update(id: number, updateDto: UpdateWeaponDto): Promise<Weapon> {
    const weapon = await this.verifyWeaponExists(id);
    const traits = await this.validateTraits(updateDto.traits);
    const firing_modes = await this.validateFiringMode(updateDto.firing_modes);

    const updatedWeapon = this.weaponRepository.merge(weapon, {
      ...updateDto,
      traits: traits,
      firing_modes: firing_modes,
    });

    return this.weaponRepository.save(updatedWeapon);
  }

  async remove(id: number): Promise<void> {
    await this.weaponRepository.delete(id);
  }

  private async verifyWeaponExists(id: number): Promise<Weapon> {
    const weapon = await this.weaponRepository.findOne({
      where: { id },
    });
    if (!weapon) {
      throw new NotFoundException(`Weapon with ID ${id} not found`);
    }
    return weapon;
  }

  private async validateTraits(traitIds: number[]): Promise<Trait[]> {
    const traits = await this.traitRepository.findByIds(traitIds);

    if (traits.length !== traitIds.length) {
      const missingIds = traitIds.filter(
        (id) => !traits.some((p) => p.id === id),
      );
      throw new BadRequestException(
        `Invalid trait IDs: ${missingIds.join(', ')}`,
      );
    }

    return traits;
  }

  private async validateFiringMode(firingModeIds: number[]): Promise<Trait[]> {
    const firing_modes = await this.fireModeRepository.findByIds(firingModeIds);

    if (firing_modes.length !== firingModeIds.length) {
      const missingIds = firingModeIds.filter(
        (id) => !firing_modes.some((p) => p.id === id),
      );
      throw new BadRequestException(
        `Invalid trait IDs: ${missingIds.join(', ')}`,
      );
    }

    return firing_modes;
  }
}
