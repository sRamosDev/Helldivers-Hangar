import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Armor } from './armor.entity';
import { Passive } from '../passive/passive.entity';

@Injectable()
export class ArmorService {
  constructor(
    @InjectRepository(Armor)
    private readonly armorRepository: Repository<Armor>,
    @InjectRepository(Passive)
    private readonly passiveRepository: Repository<Passive>,
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
    type: string;
    armor_rating: number;
    speed: number;
    stamina_regen: number;
    imageUrl: string;
    passiveIds: number[];
  }): Promise<Armor> {
    const passives = await this.passiveRepository.findByIds(
      armorData.passiveIds,
    );
    const armor = this.armorRepository.create({
      ...armorData,
      passive: passives,
    });
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
      type: string;
      armor_rating: number;
      speed: number;
      stamina_regen: number;
      imageUrl: string;
      passiveIds: number[];
    },
  ): Promise<Armor> {
    const armor = await this.armorRepository.findOne({ where: { id } });
    if (!armor) {
      throw new Error('Armor not found');
    }
    const passives = await this.passiveRepository.findByIds(
      armorData.passiveIds,
    );
    return this.armorRepository.save({
      ...armor,
      ...armorData,
      passive: passives,
    });
  }

  async remove(id: number): Promise<void> {
    await this.armorRepository.delete(id);
  }
}
