import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Throwable } from './throwable.entity';
import { CreateThrowableDto } from './dto/createThrowable.dto';
import { Trait } from "../trait/trait.entity";

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
      throw new Error('Throwable not found');
    }
    throwable.image_url = imageUrl;
    return this.throwableRepository.save(throwable);
  }

  async create(createDto: CreateThrowableDto): Promise<Throwable> {
    const traits = await this.validateTraits(createDto.traits);
    const throwable = this.throwableRepository.create({
      ...createDto,
      traits: traits,
    });

    return this.throwableRepository.save(throwable);
  }

  findAll(): Promise<Throwable[]> {
    return this.throwableRepository.find();
  }

  findOne(id: number): Promise<Throwable> {
    return this.throwableRepository.findOneBy({ id });
  }

  async update(id: number, throwableData: DeepPartial<Throwable>): Promise<Throwable> {
    await this.throwableRepository.update(id, throwableData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.throwableRepository.delete(id);
  }

  private async validateTraits(traitIds: number[]): Promise<Trait[]> {
    const traits = await this.traitRepository.findByIds(traitIds);

    if (traits.length !== traitIds.length) {
      const missingIds = traitIds.filter((id) => !traits.some((p) => p.id === id));
      throw new BadRequestException(`Invalid trait IDs: ${missingIds.join(', ')}`);
    }

    return traits;
  }
}
