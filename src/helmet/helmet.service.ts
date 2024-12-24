import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Helmet } from './helmet.entity';
import { Passive } from '../passive/passive.entity';

@Injectable()
export class HelmetService {
  constructor(
    @InjectRepository(Helmet)
    private readonly helmetRepository: Repository<Helmet>,
    @InjectRepository(Passive)
    private readonly passiveRepository: Repository<Passive>,
  ) {}

  async updateImageUrl(id: number, imageUrl: string): Promise<Helmet> {
    const helmet = await this.helmetRepository.findOne({ where: { id } });
    if (!helmet) {
      throw new Error('Helmet not found');
    }
    helmet.image_url = imageUrl;
    return this.helmetRepository.save(helmet);
  }

  async create(helmetData: {
    name: string;
    description: string;
    type: string;
    armor_rating: number;
    speed: number;
    stamina_regen: number;
    imageUrl: string;
    passiveIds: number[];
  }): Promise<Helmet> {
    const passives = await this.passiveRepository.findByIds(
      helmetData.passiveIds,
    );
    const helmet = this.helmetRepository.create({
      ...helmetData,
      passive: passives,
    });
    return this.helmetRepository.save(helmet);
  }

  async findAll(): Promise<Helmet[]> {
    return this.helmetRepository.find();
  }

  async findOne(id: number): Promise<Helmet> {
    return this.helmetRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    helmetData: {
      name: string;
      description: string;
      type: string;
      armor_rating: number;
      speed: number;
      stamina_regen: number;
      imageUrl: string;
      passiveIds: number[];
    },
  ): Promise<Helmet> {
    const helmet = await this.helmetRepository.findOne({ where: { id } });
    if (!helmet) {
      throw new Error('Helmet not found');
    }
    const passives = await this.passiveRepository.findByIds(
      helmetData.passiveIds,
    );
    return this.helmetRepository.save({
      ...helmet,
      ...helmetData,
      passive: passives,
    });
  }

  async remove(id: number): Promise<void> {
    await this.helmetRepository.delete(id);
  }
}
