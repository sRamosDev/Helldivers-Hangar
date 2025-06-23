import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { FiringModeService } from './firingMode.service';
import { FiringMode } from './firingMode.entity';
import { CreateFiringModeDto } from './dto/CreateFiringMode.dto';
import { UpdateFiringModeDto } from './dto/UpdateFiringMode.dto';

describe('FiringModeService', () => {
  let service: FiringModeService;
  let repository: jest.Mocked<Repository<FiringMode>>;

  const mockFiringMode: FiringMode = {
    id: 1,
    name: 'Single Shot',
    primary_weapons: []
  };

  const mockCreateFiringModeDto: CreateFiringModeDto = {
    name: 'Single Shot'
  };

  const mockUpdateFiringModeDto: UpdateFiringModeDto = {
    name: 'Burst Fire'
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
        FiringModeService,
        {
          provide: getRepositoryToken(FiringMode),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FiringModeService>(FiringModeService);
    repository = module.get(getRepositoryToken(FiringMode));

    // Reset all mocks before each test
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all firing modes', async () => {
      const mockFiringModes = [mockFiringMode, { ...mockFiringMode, id: 2, name: 'Full Auto' }];
      repository.find.mockResolvedValue(mockFiringModes);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith();
      expect(result).toEqual(mockFiringModes);
    });

    it('should return empty array when no firing modes exist', async () => {
      repository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return firing mode by ID', async () => {
      const firingModeId = 1;
      repository.findOne.mockResolvedValue(mockFiringMode);

      const result = await service.findOne(firingModeId);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: firingModeId } });
      expect(result).toEqual(mockFiringMode);
    });

    it('should throw NotFoundException when firing mode not found', async () => {
      const firingModeId = 999;
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne(firingModeId)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(firingModeId)).rejects.toThrow('Firing mode not found');

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: firingModeId } });
    });
  });

  describe('create', () => {
    it('should create new firing mode', async () => {
      const expectedFiringMode = { ...mockFiringMode };
      repository.create.mockReturnValue(expectedFiringMode);
      repository.save.mockResolvedValue(expectedFiringMode);

      const result = await service.create(mockCreateFiringModeDto);

      expect(repository.create).toHaveBeenCalledWith(mockCreateFiringModeDto);
      expect(repository.save).toHaveBeenCalledWith(expectedFiringMode);
      expect(result).toEqual(expectedFiringMode);
    });

    it('should delegate to repository for creation', async () => {
      const expectedFiringMode = { ...mockFiringMode };
      repository.create.mockReturnValue(expectedFiringMode);
      repository.save.mockResolvedValue(expectedFiringMode);

      await service.create(mockCreateFiringModeDto);

      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update firing mode', async () => {
      const firingModeId = 1;
      const existingFiringMode = { ...mockFiringMode };
      const updatedFiringMode = { ...existingFiringMode, ...mockUpdateFiringModeDto };

      repository.findOne.mockResolvedValue(existingFiringMode);
      repository.save.mockResolvedValue(updatedFiringMode);

      const result = await service.update(firingModeId, mockUpdateFiringModeDto);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: firingModeId } });
      expect(repository.save).toHaveBeenCalledWith(updatedFiringMode);
      expect(result).toEqual(updatedFiringMode);
    });

    it('should throw NotFoundException when updating non-existent firing mode', async () => {
      const firingModeId = 999;
      repository.findOne.mockResolvedValue(null);

      await expect(service.update(firingModeId, mockUpdateFiringModeDto)).rejects.toThrow(NotFoundException);
      await expect(service.update(firingModeId, mockUpdateFiringModeDto)).rejects.toThrow('Firing mode not found');

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: firingModeId } });
      expect(repository.save).not.toHaveBeenCalled();
    });

    it('should merge update data with existing firing mode', async () => {
      const firingModeId = 1;
      const existingFiringMode = { ...mockFiringMode };
      const partialUpdate = { name: 'Semi Auto' };
      const expectedUpdated = { ...existingFiringMode, ...partialUpdate };

      repository.findOne.mockResolvedValue(existingFiringMode);
      repository.save.mockResolvedValue(expectedUpdated);

      const result = await service.update(firingModeId, partialUpdate);

      expect(repository.save).toHaveBeenCalledWith(expectedUpdated);
      expect(result).toEqual(expectedUpdated);
    });
  });

  describe('remove', () => {
    it('should remove firing mode by ID', async () => {
      const firingModeId = 1;
      repository.delete.mockResolvedValue({ affected: 1, raw: {} });

      await service.remove(firingModeId);

      expect(repository.delete).toHaveBeenCalledWith(firingModeId);
    });

    it('should not throw error when removing non-existent firing mode', async () => {
      const firingModeId = 999;
      repository.delete.mockResolvedValue({ affected: 0, raw: {} });

      await expect(service.remove(firingModeId)).resolves.toBeUndefined();

      expect(repository.delete).toHaveBeenCalledWith(firingModeId);
    });

    it('should delegate to repository for deletion', async () => {
      const firingModeId = 1;
      repository.delete.mockResolvedValue({ affected: 1, raw: {} });

      await service.remove(firingModeId);

      expect(repository.delete).toHaveBeenCalledTimes(1);
      expect(repository.delete).toHaveBeenCalledWith(firingModeId);
    });
  });
});
