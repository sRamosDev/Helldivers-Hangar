import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cape } from './cape.entity';

@Injectable()
export class CapeService {
  constructor(
    @InjectRepository(Cape)
    private readonly capeRepository: Repository<Cape>,
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
    imageUrl: string;
    cape: number;
  }): Promise<Cape> {
    const cape = this.capeRepository.create(capeData);
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
      imageUrl: string;
      cape: number;
    },
  ): Promise<Cape> {
    const cape = await this.capeRepository.findOne({ where: { id } });
    if (!cape) {
      throw new Error('Cape not found');
    }
    return this.capeRepository.save({ ...cape, ...capeData });
  }

  async remove(id: number): Promise<void> {
    await this.capeRepository.delete(id);
  }
}
