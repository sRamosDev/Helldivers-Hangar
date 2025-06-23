import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { TraitService } from './trait.service';
import { Trait } from './trait.entity';
import { CreateTraitDto } from './dto/createTrait.dto';
import { UpdateTraitDto } from './dto/updateTrait.dto';

describe('TraitService', () => {
  let service: TraitService;
  let repository: jest.Mocked<Repository<Trait>>;

  const mockTrait: Trait = {
    id: 1,
    name: 'Rapid Fire'
  };

  const mockCreateTraitDto: CreateTraitDto = {
    name: 'Rapid Fire'
  };

  const mockUpdateTraitDto: UpdateTraitDto = {
    name: 'Enhanced Rapid Fire'
  };

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TraitService,
        {
          provide: getRepositoryToken(Trait),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TraitService>(TraitService);
    repository = module.get(getRepositoryToken(Trait));

    // Reset all mocks before each test
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create new trait', async () => {
      const expectedTrait = { ...mockTrait };
      repository.create.mockReturnValue(expectedTrait);
      repository.save.mockResolvedValue(expectedTrait);

      const result = await service.create(mockCreateTraitDto);

      expect(repository.create).toHaveBeenCalledWith(mockCreateTraitDto);
      expect(repository.save).toHaveBeenCalledWith(expectedTrait);
      expect(result).toEqual(expectedTrait);
    });

    it('should handle repository create correctly', async () => {
      const mockCreatedTrait = { ...mockTrait };
      repository.create.mockReturnValue(mockCreatedTrait);
      repository.save.mockResolvedValue(mockCreatedTrait);

      await service.create(mockCreateTraitDto);

      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return all traits', async () => {
      const mockTraits = [mockTrait, { ...mockTrait, id: 2, name: 'Heavy Damage' }];
      repository.find.mockResolvedValue(mockTraits);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith();
      expect(result).toEqual(mockTraits);
    });

    it('should return empty array when no traits exist', async () => {
      repository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return trait by ID', async () => {
      const traitId = 1;
      repository.findOneBy.mockResolvedValue(mockTrait);

      const result = await service.findOne(traitId);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: traitId });
      expect(result).toEqual(mockTrait);
    });

    it('should throw NotFoundException when trait not found', async () => {
      const traitId = 999;
      repository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne(traitId)).rejects.toThrow(
        new NotFoundException(`Trait with ID ${traitId} not found`)
      );

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: traitId });
    });
  });

  describe('update', () => {
    it('should update trait', async () => {
      const traitId = 1;
      const existingTrait = { ...mockTrait };
      const updatedTrait = { ...existingTrait, ...mockUpdateTraitDto };

      // Mock findOne calls - called twice (once for validation, once for returning updated trait)
      repository.findOneBy
        .mockResolvedValueOnce(existingTrait) // First call in update method
        .mockResolvedValueOnce(updatedTrait); // Second call to return updated trait
      
      repository.update.mockResolvedValue({ affected: 1, generatedMaps: [], raw: {} });

      const result = await service.update(traitId, mockUpdateTraitDto);

      expect(repository.findOneBy).toHaveBeenCalledTimes(2);
      expect(repository.findOneBy).toHaveBeenNthCalledWith(1, { id: traitId });
      expect(repository.update).toHaveBeenCalledWith(traitId, mockUpdateTraitDto);
      expect(repository.findOneBy).toHaveBeenNthCalledWith(2, { id: traitId });
      expect(result).toEqual(updatedTrait);
    });

    it('should throw NotFoundException when updating non-existent trait', async () => {
      const traitId = 999;
      repository.findOneBy.mockResolvedValue(null);

      await expect(service.update(traitId, mockUpdateTraitDto)).rejects.toThrow(
        new NotFoundException(`Trait with ID ${traitId} not found`)
      );

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: traitId });
      expect(repository.update).not.toHaveBeenCalled();
    });

    it('should handle partial updates', async () => {
      const traitId = 1;
      const existingTrait = { ...mockTrait };
      const partialUpdate = { name: 'Updated Name' };
      const updatedTrait = { ...existingTrait, name: 'Updated Name' };

      repository.findOneBy
        .mockResolvedValueOnce(existingTrait)
        .mockResolvedValueOnce(updatedTrait);
      
      repository.update.mockResolvedValue({ affected: 1, generatedMaps: [], raw: {} });

      const result = await service.update(traitId, partialUpdate);

      expect(repository.update).toHaveBeenCalledWith(traitId, partialUpdate);
      expect(result).toEqual(updatedTrait);
    });
  });

  describe('remove', () => {
    it('should remove trait by ID', async () => {
      const traitId = 1;
      const existingTrait = { ...mockTrait };
      
      repository.findOneBy.mockResolvedValue(existingTrait);
      repository.delete.mockResolvedValue({ affected: 1, raw: {} });

      await service.remove(traitId);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: traitId });
      expect(repository.delete).toHaveBeenCalledWith(traitId);
    });

    it('should verify trait exists before delete', async () => {
      const traitId = 999;
      repository.findOneBy.mockResolvedValue(null);

      await expect(service.remove(traitId)).rejects.toThrow(
        new NotFoundException(`Trait with ID ${traitId} not found`)
      );

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: traitId });
      expect(repository.delete).not.toHaveBeenCalled();
    });

    it('should call findOne then delete in sequence', async () => {
      const traitId = 1;
      const existingTrait = { ...mockTrait };
      
      repository.findOneBy.mockResolvedValue(existingTrait);
      repository.delete.mockResolvedValue({ affected: 1, raw: {} });

      await service.remove(traitId);

      expect(repository.findOneBy).toHaveBeenCalledTimes(1);
      expect(repository.delete).toHaveBeenCalledTimes(1);
    });
  });
});
