import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Throwable } from './throwable.entity';

@Injectable()
export class ThrowableService {
  constructor(
    @InjectRepository(Throwable)
    private readonly throwableRepository: Repository<Throwable>,
  ) {}

  async updateImageUrl(id: number, imageUrl: string): Promise<Throwable> {
    const throwable = await this.throwableRepository.findOne({ where: { id } });
    if (!throwable) {
      throw new Error('Throwable not found');
    }
    throwable.image_url = imageUrl;
    return this.throwableRepository.save(throwable);
  }

  create(throwableData: DeepPartial<Throwable>): Promise<Throwable> {
    const throwable = this.throwableRepository.create(throwableData);
    return this.throwableRepository.save(throwable);
  }

  findAll(): Promise<Throwable[]> {
    return this.throwableRepository.find();
  }

  findOne(id: number): Promise<Throwable> {
    return this.throwableRepository.findOneBy({ id });
  }

  async update(
    id: number,
    throwableData: DeepPartial<Throwable>,
  ): Promise<Throwable> {
    await this.throwableRepository.update(id, throwableData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.throwableRepository.delete(id);
  }
}
