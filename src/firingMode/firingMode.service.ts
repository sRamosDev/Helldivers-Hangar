import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FiringMode } from './firingMode.entity';

@Injectable()
export class FiringModeService {
  constructor(
    @InjectRepository(FiringMode)
    private readonly firingModeRepository: Repository<FiringMode>,
  ) {}

  findAll(): Promise<FiringMode[]> {
    return this.firingModeRepository.find();
  }

  findOne(id: number): Promise<FiringMode> {
    return this.firingModeRepository.findOne({ where: { id } });
  }

  async create(firingMode: FiringMode): Promise<FiringMode> {
    return this.firingModeRepository.save(firingMode);
  }

  async update(id: number, firingMode: FiringMode): Promise<FiringMode> {
    await this.firingModeRepository.update(id, firingMode);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.firingModeRepository.delete(id);
  }
}
