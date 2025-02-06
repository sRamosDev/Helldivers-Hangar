import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Throwable } from './throwable.entity';
import { CreateThrowableDto } from './dto/createThrowable.dto';
import { UpdateThrowableDto } from './dto/updateThrowable.dto';
import { Trait } from '../trait/trait.entity';

@Injectable()
export class ThrowableService {
  constructor(
    @InjectRepository(Throwable)
    private readonly throwableRepository: Repository<Throwable>,
    @InjectRepository(Trait)
    private readonly traitRepository: Repository<Trait>,
  ) {}

  async updateImageUrl(id: number, imageUrl: string): Promise<Throwable> {
    const throwable = await this.throwableRepository.findOne({ where: { id } });
    if (!throwable) {
      throw new NotFoundException('Throwable not found');
    }
    throwable.image_url = imageUrl;
    return this.throwableRepository.save(throwable);
  }

  async create(createDto: CreateThrowableDto): Promise<Throwable> {
    const traits = await this.validateTraits(createDto.traits);
    const throwable = this.throwableRepository.create({
      ...createDto,
      traits,
    });
    return this.throwableRepository.save(throwable);
  }

  findAll(): Promise<Throwable[]> {
    return this.throwableRepository.find({ relations: ['traits'] });
  }

  async findOne(id: number): Promise<Throwable> {
    const throwable = await this.throwableRepository.findOne({
      where: { id },
      relations: ['traits'],
    });
    if (!throwable) {
      throw new NotFoundException(`Throwable with ID ${id} not found`);
    }
    return throwable;
  }

  async update(id: number, updateDto: UpdateThrowableDto): Promise<Throwable> {
    const throwable = await this.findOne(id);
    const traits = updateDto.traits ? await this.validateTraits(updateDto.traits) : throwable.traits;
    const updatedThrowable: DeepPartial<Throwable> = {
      ...updateDto,
      image_url: updateDto.image_url || throwable.image_url,
      traits,
    };
    await this.throwableRepository.update(id, updatedThrowable);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.throwableRepository.delete(id);
  }

  private async validateTraits(traitIds: number[]): Promise<Trait[]> {
    if (!traitIds) {
      return [];
    }
    const traits = await this.traitRepository.findByIds(traitIds);
    if (traits.length !== traitIds.length) {
      const missingIds = traitIds.filter((id) => !traits.some((t) => t.id === id));
      throw new BadRequestException(`Invalid trait IDs: ${missingIds.join(', ')}`);
    }
    return traits;
  }
}
