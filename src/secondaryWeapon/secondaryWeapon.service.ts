import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { SecondaryWeapon } from './secondaryWeapon.entity';

@Injectable()
export class SecondaryWeaponService {
  constructor(
    @InjectRepository(SecondaryWeapon)
    private readonly secondaryWeaponRepository: Repository<SecondaryWeapon>,
  ) {}

  async updateImageUrl(id: number, imageUrl: string): Promise<SecondaryWeapon> {
    const secondaryWeapon = await this.secondaryWeaponRepository.findOne({
      where: { id },
    });
    if (!secondaryWeapon) {
      throw new Error('SecondaryWeapon not found');
    }
    secondaryWeapon.image_url = imageUrl;
    return this.secondaryWeaponRepository.save(secondaryWeapon);
  }

  async create(secondaryWeaponData: {
    name: string;
    description: string;
    imageUrl: string;
    type: string;
    damage: number;
    capacity: number;
    recoil: number;
    fireRate: number;
    maxPenetration: DeepPartial<SecondaryWeapon['max_penetration']>;
  }): Promise<SecondaryWeapon> {
    const secondaryWeapon =
      this.secondaryWeaponRepository.create(secondaryWeaponData);
    return this.secondaryWeaponRepository.save(secondaryWeapon);
  }

  async findAll(): Promise<SecondaryWeapon[]> {
    return this.secondaryWeaponRepository.find();
  }

  async findOne(id: number): Promise<SecondaryWeapon> {
    return this.secondaryWeaponRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    secondaryWeaponData: {
      name: string;
      description: string;
      imageUrl: string;
      type: string;
      damage: number;
      capacity: number;
      recoil: number;
      fireRate: number;
      maxPenetration: DeepPartial<SecondaryWeapon['max_penetration']>;
    },
  ): Promise<SecondaryWeapon> {
    const secondaryWeapon = await this.secondaryWeaponRepository.findOne({
      where: { id },
    });
    if (!secondaryWeapon) {
      throw new Error('SecondaryWeapon not found');
    }
    return this.secondaryWeaponRepository.save({
      ...secondaryWeapon,
      ...secondaryWeaponData,
    } as DeepPartial<SecondaryWeapon>);
  }

  async remove(id: number): Promise<void> {
    await this.secondaryWeaponRepository.delete(id);
  }
}
