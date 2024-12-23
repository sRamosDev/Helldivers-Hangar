import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { PrimaryWeapon } from './primaryWeapon.entity';

@Injectable()
export class PrimaryWeaponService {
  constructor(
    @InjectRepository(PrimaryWeapon)
    private readonly primaryWeaponRepository: Repository<PrimaryWeapon>,
  ) {}

  async updateImageUrl(id: number, imageUrl: string): Promise<PrimaryWeapon> {
    const primaryWeapon = await this.primaryWeaponRepository.findOne({
      where: { id },
    });
    if (!primaryWeapon) {
      throw new Error('PrimaryWeapon not found');
    }
    primaryWeapon.image_url = imageUrl;
    return this.primaryWeaponRepository.save(primaryWeapon);
  }

  async create(primaryWeaponData: {
    name: string;
    description: string;
    imageUrl: string;
    type: string;
    damage: number;
    capacity: number;
    recoil: number;
    fireRate: number;
    maxPenetration: DeepPartial<PrimaryWeapon['max_penetration']>;
  }): Promise<PrimaryWeapon> {
    const primaryWeapon =
      this.primaryWeaponRepository.create(primaryWeaponData);
    return this.primaryWeaponRepository.save(primaryWeapon);
  }

  async findAll(): Promise<PrimaryWeapon[]> {
    return this.primaryWeaponRepository.find();
  }

  async findOne(id: number): Promise<PrimaryWeapon> {
    return this.primaryWeaponRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    primaryWeaponData: {
      name: string;
      description: string;
      imageUrl: string;
      type: string;
      damage: number;
      capacity: number;
      recoil: number;
      fireRate: number;
      maxPenetration: DeepPartial<PrimaryWeapon['max_penetration']>;
    },
  ): Promise<PrimaryWeapon> {
    const primaryWeapon = await this.primaryWeaponRepository.findOne({
      where: { id },
    });
    if (!primaryWeapon) {
      throw new Error('PrimaryWeapon not found');
    }
    return this.primaryWeaponRepository.save({
      ...primaryWeapon,
      ...primaryWeaponData,
    } as DeepPartial<PrimaryWeapon>);
  }

  async remove(id: number): Promise<void> {
    await this.primaryWeaponRepository.delete(id);
  }
}
