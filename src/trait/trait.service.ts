import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trait } from './trait.entity';

@Injectable()
export class TraitService {
  constructor(
    @InjectRepository(Trait)
    private readonly traitRepository: Repository<Trait>,
  ) {}

  create(trait: Partial<Trait>): Promise<Trait> {
    const newTrait = this.traitRepository.create(trait);
    return this.traitRepository.save(newTrait);
  }

  findAll(): Promise<Trait[]> {
    return this.traitRepository.find();
  }

  findOne(id: number): Promise<Trait> {
    return this.traitRepository.findOneBy({ id });
  }

  async update(id: number, trait: Partial<Trait>): Promise<Trait> {
    await this.traitRepository.update(id, trait);
    return this.traitRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.traitRepository.delete(id);
  }
}
