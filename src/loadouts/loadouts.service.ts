import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loadout } from './loadout.entity';
import { randomBytes } from 'crypto';
import { CreateLoadoutDto } from './dto/CreateLoadout.dto';
import { User } from '../users/users.entity';

@Injectable()
export class LoadoutsService {
  constructor(
    @InjectRepository(Loadout)
    private loadoutsRepository: Repository<Loadout>,
  ) {}

  async create(loadoutData: CreateLoadoutDto, user: User): Promise<Loadout> {
    const {
      name,
      helmetId,
      armorId,
      capeId,
      primaryWeaponId,
      secondaryWeaponId,
      throwableId,
    } = loadoutData;

    const uniqueId = this.generateUniqueId();

    const loadout = this.loadoutsRepository.create({
      name,
      uniqueId,
      helmet: { id: helmetId },
      armor: { id: armorId },
      cape: { id: capeId },
      primary_weapon: { id: primaryWeaponId },
      secondary_weapon: { id: secondaryWeaponId },
      throwable: { id: throwableId },
      createdBy: user,
    });

    return this.loadoutsRepository.save(loadout);
  }

  async findAll(): Promise<Loadout[]> {
    return this.loadoutsRepository.find();
  }

  async findOne(uniqueId: string): Promise<Loadout> {
    return this.loadoutsRepository.findOne({
      where: { uniqueId },
      relations: [
        'helmet',
        'helmet.passive',
        'armor',
        'armor.passive',
        'cape',
        'cape.passive',
        'primary_weapon',
        'primary_weapon.traits',
        'secondary_weapon',
        'secondary_weapon.traits',
        'throwable',
        // 'throwable.traits',
      ],
    });
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

  private generateUniqueId(): string {
    return randomBytes(8)
      .toString('base64')
      .replace(/\//g, '_')
      .replace(/\+/g, '-');
  }
}
