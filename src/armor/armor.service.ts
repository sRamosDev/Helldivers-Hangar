import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Armor } from './armor.entity';

@Injectable()
export class ArmorService {
  constructor(
    @InjectRepository(Armor)
    private readonly armorRepository: Repository<Armor>,
  ) {}

  async updateImageUrl(id: number, imageUrl: string): Promise<Armor> {
    const armor = await this.armorRepository.findOne({ where: { id } });
    if (!armor) {
      throw new Error('Armor not found');
    }
    armor.image_url = imageUrl;
    return this.armorRepository.save(armor);
  }

  async create(armorData: {
    name: string;
    description: string;
    imageUrl: string;
    armor: number;
  }): Promise<Armor> {
    const armor = this.armorRepository.create(armorData);
    return this.armorRepository.save(armor);
  }

  async findAll(): Promise<Armor[]> {
    return this.armorRepository.find();
  }

  async findOne(id: number): Promise<Armor> {
    return this.armorRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    armorData: {
      name: string;
      description: string;
      imageUrl: string;
      armor: number;
    },
  ): Promise<Armor> {
    const armor = await this.armorRepository.findOne({ where: { id } });
    if (!armor) {
      throw new Error('Armor not found');
    }
    return this.armorRepository.save({ ...armor, ...armorData });
  }

  async remove(id: number): Promise<void> {
    await this.armorRepository.delete(id);
  }
}
