import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Weapon } from './weapon.entity';

@Injectable()
export class WeaponService {
  constructor(
    @InjectRepository(Weapon)
    private readonly weaponRepository: Repository<Weapon>,
  ) {}

  async updateImageUrl(id: number, imageUrl: string): Promise<Weapon> {
    const weapon = await this.weaponRepository.findOne({
      where: { id },
    });
    if (!weapon) {
      throw new Error('Weapon not found');
    }
    weapon.image_url = imageUrl;
    return this.weaponRepository.save(weapon);
  }

  async create(weaponData: {
    name: string;
    description: string;
    category: DeepPartial<Weapon['category']>;
    imageUrl: string;
    type: string;
    damage: number;
    capacity: number;
    recoil: number;
    fireRate: number;
    maxPenetration: DeepPartial<Weapon['max_penetration']>;
  }): Promise<Weapon> {
    const weapon = this.weaponRepository.create(weaponData);
    return this.weaponRepository.save(weapon);
  }

  async findAll(): Promise<Weapon[]> {
    return this.weaponRepository.find();
  }

  async findOne(id: number): Promise<Weapon> {
    return this.weaponRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    weaponData: {
      name: string;
      description: string;
      category: DeepPartial<Weapon['category']>;
      imageUrl: string;
      type: string;
      damage: number;
      capacity: number;
      recoil: number;
      fireRate: number;
      maxPenetration: DeepPartial<Weapon['max_penetration']>;
    },
  ): Promise<Weapon> {
    const weapon = await this.weaponRepository.findOne({
      where: { id },
    });
    if (!weapon) {
      throw new Error('Weapon not found');
    }
    return this.weaponRepository.save({
      ...weapon,
      ...weaponData,
    } as DeepPartial<Weapon>);
  }

  async remove(id: number): Promise<void> {
    await this.weaponRepository.delete(id);
  }
}
