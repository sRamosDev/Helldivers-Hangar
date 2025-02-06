import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Passive } from './passive.entity';
import { CreatePassiveDto } from './dto/createPassive.dto';
import { UpdatePassiveDto } from './dto/updatePassive.dto';

@Injectable()
export class PassiveService {
  constructor(
    @InjectRepository(Passive)
    private readonly passiveRepository: Repository<Passive>,
  ) {}

  findAll(): Promise<Passive[]> {
    return this.passiveRepository.find();
  }

  async findOne(id: number): Promise<Passive> {
    const passive = await this.passiveRepository.findOne({ where: { id } });
    if (!passive) {
      throw new NotFoundException(`Passive with ID ${id} not found`);
    }
    return passive;
  }

  async create(createPassiveDto: CreatePassiveDto): Promise<Passive> {
    const passive = this.passiveRepository.create(createPassiveDto);
    return this.passiveRepository.save(passive);
  }

  async update(id: number, updatePassiveDto: UpdatePassiveDto): Promise<Passive> {
    const passive = await this.findOne(id);
    const updatedPassive = Object.assign(passive, updatePassiveDto);
    return this.passiveRepository.save(updatedPassive);
  }

  async remove(id: number): Promise<void> {
    await this.passiveRepository.delete(id);
  }
}
