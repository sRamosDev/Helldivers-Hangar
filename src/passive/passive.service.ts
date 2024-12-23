import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Passive } from './passive.entity';

@Injectable()
export class PassiveService {
  constructor(
    @InjectRepository(Passive)
    private readonly passiveRepository: Repository<Passive>,
  ) {}

  findAll(): Promise<Passive[]> {
    return this.passiveRepository.find();
  }

  findOne(id: number): Promise<Passive> {
    return this.passiveRepository.findOneBy({ id });
  }

  create(passive: Passive): Promise<Passive> {
    return this.passiveRepository.save(passive);
  }

  async update(id: number, passive: Passive): Promise<Passive> {
    await this.passiveRepository.update(id, passive);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.passiveRepository.delete(id);
  }
}
