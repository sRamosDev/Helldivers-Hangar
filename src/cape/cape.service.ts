import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cape } from './cape.entity';
import { Passive } from '../passive/passive.entity';

@Injectable()
export class CapeService {
  constructor(
    @InjectRepository(Cape)
    private readonly capeRepository: Repository<Cape>,
    @InjectRepository(Passive)
    private readonly passiveRepository: Repository<Passive>,
  ) {}

  async updateImageUrl(id: number, imageUrl: string): Promise<Cape> {
    const cape = await this.capeRepository.findOne({ where: { id } });
    if (!cape) {
      throw new Error('Cape not found');
    }
    cape.image_url = imageUrl;
    return this.capeRepository.save(cape);
  }

  async create(capeData: {
    name: string;
    description: string;
    type: string;
    cape_rating: number;
    speed: number;
    stamina_regen: number;
    imageUrl: string;
    passiveIds: number[];
  }): Promise<Cape> {
    const passives = await this.passiveRepository.findByIds(
      capeData.passiveIds,
    );
    const cape = this.capeRepository.create({
      ...capeData,
      passive: passives,
    });
    return this.capeRepository.save(cape);
  }

  async findAll(): Promise<Cape[]> {
    return this.capeRepository.find();
  }

  async findOne(id: number): Promise<Cape> {
    return this.capeRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    capeData: {
      name: string;
      description: string;
      type: string;
      cape_rating: number;
      speed: number;
      stamina_regen: number;
      imageUrl: string;
      passiveIds: number[];
    },
  ): Promise<Cape> {
    const cape = await this.capeRepository.findOne({ where: { id } });
    if (!cape) {
      throw new Error('Cape not found');
    }
    const passives = await this.passiveRepository.findByIds(
      capeData.passiveIds,
    );
    return this.capeRepository.save({
      ...cape,
      ...capeData,
      passive: passives,
    });
  }

  async remove(id: number): Promise<void> {
    await this.capeRepository.delete(id);
  }
}
