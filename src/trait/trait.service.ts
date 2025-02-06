import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trait } from './trait.entity';
import { CreateTraitDto } from './dto/createTrait.dto';
import { UpdateTraitDto } from './dto/updateTrait.dto';

@Injectable()
export class TraitService {
  constructor(
    @InjectRepository(Trait)
    private readonly traitRepository: Repository<Trait>,
  ) {}

  async create(createTraitDto: CreateTraitDto): Promise<Trait> {
    const trait = this.traitRepository.create(createTraitDto);
    return this.traitRepository.save(trait);
  }

  findAll(): Promise<Trait[]> {
    return this.traitRepository.find();
  }

  async findOne(id: number): Promise<Trait> {
    const trait = await this.traitRepository.findOneBy({ id });
    if (!trait) {
      throw new NotFoundException(`Trait with ID ${id} not found`);
    }
    return trait;
  }

  async update(id: number, updateTraitDto: UpdateTraitDto): Promise<Trait> {
    await this.findOne(id); 
    await this.traitRepository.update(id, updateTraitDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.traitRepository.delete(id);
  }
}
