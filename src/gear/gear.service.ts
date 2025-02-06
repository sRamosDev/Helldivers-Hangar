import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gear } from './gear.entity';
import { Passive } from '../passive/passive.entity';
import { CreateGearDto } from './dto/createGear.dto';
import { UpdateGearDto } from './dto/updateGear.dto';

@Injectable()
export class GearService {
  constructor(
    @InjectRepository(Gear)
    private readonly gearRepository: Repository<Gear>,
    @InjectRepository(Passive)
    private readonly passiveRepository: Repository<Passive>,
  ) {}

  private async verifyGearExists(id: number): Promise<Gear> {
    const gear = await this.gearRepository.findOne({ where: { id } });
    if (!gear) {
      throw new NotFoundException(`Gear with ID ${id} not found`);
    }
    return gear;
  }

  async updateImageUrl(id: number, imageUrl: string): Promise<Gear> {
    const gear = await this.verifyGearExists(id);
    gear.image_url = imageUrl;
    return this.gearRepository.save(gear);
  }

  async create(createDto: CreateGearDto): Promise<Gear> {
    const passives = await this.validatePassives(createDto.passiveIds);

    const gear = this.gearRepository.create({
      ...createDto,
      image_url: createDto.imageUrl,
      passive: passives,
    });
    return this.gearRepository.save(gear);
  }

  async findAll(): Promise<Gear[]> {
    return this.gearRepository.find();
  }

  async findOne(id: number): Promise<Gear> {
    const gear = await this.gearRepository.findOne({
      where: { id },
      relations: ['passive'],
    });
    if (!gear) {
      throw new NotFoundException(`Gear with ID ${id} not found`);
    }
    return gear;
  }

  async update(id: number, updateDto: UpdateGearDto): Promise<Gear> {
    const gear = await this.verifyGearExists(id);
    const passives = updateDto.passiveIds
      ? await this.validatePassives(updateDto.passiveIds)
      : gear.passive;
    const updatedGear = this.gearRepository.merge(gear, {
      ...updateDto,
      image_url: updateDto.imageUrl || gear.image_url,
      passive: passives,
    });
    return this.gearRepository.save(updatedGear);
  }

  async remove(id: number): Promise<void> {
    await this.gearRepository.delete(id);
  }

  private async validatePassives(passiveIds: number[]): Promise<Passive[]> {
    if (!passiveIds) {
      return [];
    }
    const passives = await this.passiveRepository.findByIds(passiveIds);
    if (passives.length !== passiveIds.length) {
      const missingIds = passiveIds.filter(
        (id) => !passives.some((p) => p.id === id),
      );
      throw new BadRequestException(
        `Invalid passive IDs: ${missingIds.join(', ')}`,
      );
    }
    return passives;
  }
}
