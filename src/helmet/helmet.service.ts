import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Helmet } from './helmet.entity';

@Injectable()
export class HelmetService {
  constructor(
    @InjectRepository(Helmet)
    private readonly helmetRepository: Repository<Helmet>,
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
    imageUrl: string;
    helmet: number;
  }): Promise<Helmet> {
    const helmet = this.helmetRepository.create(helmetData);
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
      imageUrl: string;
      helmet: number;
    },
  ): Promise<Helmet> {
    const helmet = await this.helmetRepository.findOne({ where: { id } });
    if (!helmet) {
      throw new Error('Helmet not found');
    }
    return this.helmetRepository.save({ ...helmet, ...helmetData });
  }

  async remove(id: number): Promise<void> {
    await this.helmetRepository.delete(id);
  }
}
