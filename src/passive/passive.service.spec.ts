import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { PassiveService } from './passive.service';
import { Passive } from './passive.entity';
import { CreatePassiveDto } from './dto/createPassive.dto';
import { UpdatePassiveDto } from './dto/updatePassive.dto';

describe('PassiveService', () => {
  let service: PassiveService;
  let repository: jest.Mocked<Repository<Passive>>;

  const mockPassive: Passive = {
    id: 1,
    name: 'Stealth Mode',
    description: 'Grants temporary invisibility to the user',
    gear: []
  };

  const mockCreatePassiveDto: CreatePassiveDto = {
    name: 'Stealth Mode',
    description: 'Grants temporary invisibility to the user'
  };

  const mockUpdatePassiveDto: UpdatePassiveDto = {
    name: 'Enhanced Stealth',
    description: 'Provides enhanced stealth capabilities'
  };

  beforeEach(async () => {
    const mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PassiveService,
        {
          provide: getRepositoryToken(Passive),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PassiveService>(PassiveService);
    repository = module.get(getRepositoryToken(Passive));

    // Reset all mocks before each test
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all passives', async () => {
      const mockPassives = [mockPassive, { ...mockPassive, id: 2, name: 'Shield Boost' }];
      repository.find.mockResolvedValue(mockPassives);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith();
      expect(result).toEqual(mockPassives);
    });

    it('should return empty array when no passives exist', async () => {
      repository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return passive by ID', async () => {
      const passiveId = 1;
      repository.findOne.mockResolvedValue(mockPassive);

      const result = await service.findOne(passiveId);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: passiveId } });
      expect(result).toEqual(mockPassive);
    });

    it('should throw NotFoundException when passive not found', async () => {
      const passiveId = 999;
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne(passiveId)).rejects.toThrow(
        new NotFoundException(`Passive with ID ${passiveId} not found`)
      );

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: passiveId } });
    });
  });

  describe('create', () => {
    it('should create new passive', async () => {
      const expectedPassive = { ...mockPassive };
      repository.create.mockReturnValue(expectedPassive);
      repository.save.mockResolvedValue(expectedPassive);

      const result = await service.create(mockCreatePassiveDto);

      expect(repository.create).toHaveBeenCalledWith(mockCreatePassiveDto);
      expect(repository.save).toHaveBeenCalledWith(expectedPassive);
      expect(result).toEqual(expectedPassive);
    });

    it('should handle repository create correctly', async () => {
      const mockCreatedPassive = { ...mockPassive };
      repository.create.mockReturnValue(mockCreatedPassive);
      repository.save.mockResolvedValue(mockCreatedPassive);

      await service.create(mockCreatePassiveDto);

      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update passive with new data', async () => {
      const passiveId = 1;
      const existingPassive = { ...mockPassive };
      const updatedPassive = { ...existingPassive, ...mockUpdatePassiveDto };

      repository.findOne.mockResolvedValue(existingPassive);
      repository.save.mockResolvedValue(updatedPassive);

      const result = await service.update(passiveId, mockUpdatePassiveDto);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: passiveId } });
      expect(repository.save).toHaveBeenCalledWith(updatedPassive);
      expect(result).toEqual(updatedPassive);
    });

    it('should update passive with partial data', async () => {
      const passiveId = 1;
      const existingPassive = { ...mockPassive };
      const partialUpdateDto = { name: 'Updated Name' };
      const updatedPassive = { ...existingPassive, name: 'Updated Name' };

      repository.findOne.mockResolvedValue(existingPassive);
      repository.save.mockResolvedValue(updatedPassive);

      const result = await service.update(passiveId, partialUpdateDto);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: passiveId } });
      expect(repository.save).toHaveBeenCalledWith(updatedPassive);
      expect(result).toEqual(updatedPassive);
    });

    it('should throw NotFoundException when updating non-existent passive', async () => {
      const passiveId = 999;
      repository.findOne.mockResolvedValue(null);

      await expect(service.update(passiveId, mockUpdatePassiveDto)).rejects.toThrow(
        new NotFoundException(`Passive with ID ${passiveId} not found`)
      );

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: passiveId } });
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove passive by ID', async () => {
      const passiveId = 1;
      repository.delete.mockResolvedValue({ affected: 1, raw: {} });

      await service.remove(passiveId);

      expect(repository.delete).toHaveBeenCalledWith(passiveId);
    });

    it('should not throw error when removing non-existent passive', async () => {
      const passiveId = 999;
      repository.delete.mockResolvedValue({ affected: 0, raw: {} });

      await expect(service.remove(passiveId)).resolves.not.toThrow();

      expect(repository.delete).toHaveBeenCalledWith(passiveId);
    });

    it('should call repository delete once', async () => {
      const passiveId = 1;
      repository.delete.mockResolvedValue({ affected: 1, raw: {} });

      await service.remove(passiveId);

      expect(repository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
