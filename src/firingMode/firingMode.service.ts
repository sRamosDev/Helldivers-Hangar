import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FiringMode } from './firingMode.entity';
import { CreateFiringModeDto } from './dto/CreateFiringMode.dto';
import { UpdateFiringModeDto } from './dto/UpdateFiringMode.dto';

@Injectable()
export class FiringModeService {
  constructor(
    @InjectRepository(FiringMode)
    private readonly firingModeRepository: Repository<FiringMode>,
  ) {}

  findAll(): Promise<FiringMode[]> {
    return this.firingModeRepository.find();
  }

  async findOne(id: number): Promise<FiringMode> {
    const firingMode = await this.firingModeRepository.findOne({ where: { id } });
    if (!firingMode) {
      throw new NotFoundException('Firing mode not found');
    }
    return firingMode;
  }

  async create(createFiringModeDto: CreateFiringModeDto): Promise<FiringMode> {
    const firingMode = this.firingModeRepository.create(createFiringModeDto);
    return this.firingModeRepository.save(firingMode);
  }

  async update(id: number, updateFiringModeDto: UpdateFiringModeDto): Promise<FiringMode> {
    const firingMode = await this.findOne(id);
    const updatedFiringMode = Object.assign(firingMode, updateFiringModeDto);
    return this.firingModeRepository.save(updatedFiringMode);
  }

  async remove(id: number): Promise<void> {
    await this.firingModeRepository.delete(id);
  }
}
