// src/loadouts/loadouts.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loadout } from './loadout.entity';

@Injectable()
export class LoadoutsService {
  constructor(
    @InjectRepository(Loadout)
    private loadoutsRepository: Repository<Loadout>,
  ) {}

  async create(loadoutData: any): Promise<Loadout> {
    const {
      name,
      helmetId,
      armorId,
      capeId,
      primaryWeaponId,
      secondaryWeaponId,
      throwableId,
    } = loadoutData;

    const loadout = this.loadoutsRepository.create({
      name,
      helmet: { id: helmetId }, // Assuming you'll fetch or link these similarly
      armor: { id: armorId },
      cape: { id: capeId },
      primary_weapon: { id: primaryWeaponId },
      secondary_weapon: { id: secondaryWeaponId },
      throwable: { id: throwableId },
    });

    return this.loadoutsRepository.save(loadout);
  }

  async findAll(): Promise<Loadout[]> {
    return this.loadoutsRepository.find();
  }

  async findOne(id: number): Promise<Loadout> {
    return this.loadoutsRepository.findOne({ where: { id } });
  }

  async update(id: number, loadoutData: any): Promise<Loadout> {
    const loadout = await this.loadoutsRepository.findOne({ where: { id } });
    if (!loadout) {
      throw new Error('Loadout not found');
    }

    const {
      name,
      helmetId,
      armorId,
      capeId,
      primaryWeaponId,
      secondaryWeaponId,
      throwableId,
    } = loadoutData;

    return this.loadoutsRepository.save({
      ...loadout,
      name,
      helmet: { id: helmetId },
      armor: { id: armorId },
      cape: { id: capeId },
      primaryWeapon: { id: primaryWeaponId },
      secondaryWeapon: { id: secondaryWeaponId },
      throwable: { id: throwableId },
    });
  }

  async remove(id: number): Promise<void> {
    await this.loadoutsRepository.delete(id);
  }
}
