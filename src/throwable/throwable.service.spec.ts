import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ThrowableService } from './throwable.service';
import { Throwable } from './throwable.entity';
import { Trait } from '../trait/trait.entity';
import { CreateThrowableDto } from './dto/createThrowable.dto';
import { UpdateThrowableDto } from './dto/updateThrowable.dto';

describe('ThrowableService', () => {
  let service: ThrowableService;
  let throwableRepository: jest.Mocked<Repository<Throwable>>;
  let traitRepository: jest.Mocked<Repository<Trait>>;
  const mockTrait1: Trait = { id: 1, name: 'Explosive' };
  const mockTrait2: Trait = { id: 2, name: 'Incendiary' };

  const mockThrowable: Throwable = {
    id: 1,
    name: 'G-12 High Explosive',
    description: 'A high explosive grenade',
    damage: 800,
    penetration: 2,
    outer_radius: 5,
    fuse_time: 3.5,
    image_url: 'http://example.com/image.png',
    traits: [mockTrait1, mockTrait2],
    loadouts_throwable: []
  };

  const mockCreateThrowableDto: CreateThrowableDto = {
    name: 'G-12 High Explosive',
    description: 'A high explosive grenade',
    damage: 800,
    penetration: 2,
    outer_radius: 5,
    fuse_time: 3.5,
    image_url: 'http://example.com/image.png',
    traits: [1, 2]
  };

  const mockUpdateThrowableDto: UpdateThrowableDto = {
    name: 'Updated Grenade',
    damage: 900,
    traits: [1]
  };

  beforeEach(async () => {
    const mockThrowableRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const mockTraitRepository = {
      findByIds: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThrowableService,
        {
          provide: getRepositoryToken(Throwable),
          useValue: mockThrowableRepository,
        },
        {
          provide: getRepositoryToken(Trait),
          useValue: mockTraitRepository,
        },
      ],
    }).compile();

    service = module.get<ThrowableService>(ThrowableService);
    throwableRepository = module.get(getRepositoryToken(Throwable));
    traitRepository = module.get(getRepositoryToken(Trait));

    // Reset all mocks before each test
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create throwable with traits', async () => {
      const expectedTraits = [mockTrait1, mockTrait2];
      const expectedThrowable = { ...mockThrowable };

      traitRepository.findByIds.mockResolvedValue(expectedTraits);
      throwableRepository.create.mockReturnValue(expectedThrowable);
      throwableRepository.save.mockResolvedValue(expectedThrowable);

      const result = await service.create(mockCreateThrowableDto);

      expect(traitRepository.findByIds).toHaveBeenCalledWith([1, 2]);
      expect(throwableRepository.create).toHaveBeenCalledWith({
        ...mockCreateThrowableDto,
        traits: expectedTraits,
      });
      expect(throwableRepository.save).toHaveBeenCalledWith(expectedThrowable);
      expect(result).toEqual(expectedThrowable);
    });

    it('should create throwable without traits', async () => {
      const dtoWithoutTraits = { ...mockCreateThrowableDto, traits: [] };
      const expectedThrowable = { ...mockThrowable, traits: [] };

      traitRepository.findByIds.mockResolvedValue([]);
      throwableRepository.create.mockReturnValue(expectedThrowable);
      throwableRepository.save.mockResolvedValue(expectedThrowable);

      const result = await service.create(dtoWithoutTraits);

      expect(traitRepository.findByIds).toHaveBeenCalledWith([]);
      expect(throwableRepository.create).toHaveBeenCalledWith({
        ...dtoWithoutTraits,
        traits: [],
      });
      expect(result).toEqual(expectedThrowable);
    });

    it('should validate all traits exist', async () => {
      const validTraits = [mockTrait1, mockTrait2];
      traitRepository.findByIds.mockResolvedValue(validTraits);
      throwableRepository.create.mockReturnValue(mockThrowable);
      throwableRepository.save.mockResolvedValue(mockThrowable);

      await service.create(mockCreateThrowableDto);

      expect(traitRepository.findByIds).toHaveBeenCalledWith([1, 2]);
      expect(throwableRepository.create).toHaveBeenCalledWith({
        ...mockCreateThrowableDto,
        traits: validTraits,
      });
    });

    it('should throw BadRequestException with invalid trait IDs', async () => {
      const dtoWithInvalidTraits = { ...mockCreateThrowableDto, traits: [1, 2, 999] };
      traitRepository.findByIds.mockResolvedValue([mockTrait1, mockTrait2]); // Missing trait 999

      await expect(service.create(dtoWithInvalidTraits)).rejects.toThrow(BadRequestException);
      await expect(service.create(dtoWithInvalidTraits)).rejects.toThrow('Invalid trait IDs: 999');

      expect(traitRepository.findByIds).toHaveBeenCalledWith([1, 2, 999]);
      expect(throwableRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return all throwables with relations', async () => {
      const mockThrowables = [mockThrowable, { ...mockThrowable, id: 2, name: 'Another Grenade' }];
      throwableRepository.find.mockResolvedValue(mockThrowables);

      const result = await service.findAll();

      expect(throwableRepository.find).toHaveBeenCalledWith({ relations: ['traits'] });
      expect(result).toEqual(mockThrowables);
    });

    it('should return empty array when no throwables exist', async () => {
      throwableRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(throwableRepository.find).toHaveBeenCalledWith({ relations: ['traits'] });
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return throwable by ID with relations', async () => {
      const throwableId = 1;
      throwableRepository.findOne.mockResolvedValue(mockThrowable);

      const result = await service.findOne(throwableId);

      expect(throwableRepository.findOne).toHaveBeenCalledWith({
        where: { id: throwableId },
        relations: ['traits'],
      });
      expect(result).toEqual(mockThrowable);
    });

    it('should throw NotFoundException when throwable not found', async () => {
      const throwableId = 999;
      throwableRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(throwableId)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(throwableId)).rejects.toThrow('Throwable with ID 999 not found');

      expect(throwableRepository.findOne).toHaveBeenCalledWith({
        where: { id: throwableId },
        relations: ['traits'],
      });
    });
  });

  describe('update', () => {
    it('should update throwable with new data', async () => {
      const throwableId = 1;
      const existingThrowable = { ...mockThrowable };
      const updatedTraits = [mockTrait1];
      const updatedThrowable = { ...existingThrowable, ...mockUpdateThrowableDto, traits: updatedTraits };

      throwableRepository.findOne.mockResolvedValue(existingThrowable);      traitRepository.findByIds.mockResolvedValue(updatedTraits);
      throwableRepository.update.mockResolvedValue({ affected: 1, raw: {}, generatedMaps: [] });
      throwableRepository.findOne.mockResolvedValueOnce(existingThrowable) // First call in update
        .mockResolvedValueOnce(updatedThrowable); // Second call after update

      const result = await service.update(throwableId, mockUpdateThrowableDto);

      expect(throwableRepository.findOne).toHaveBeenCalledTimes(2);
      expect(traitRepository.findByIds).toHaveBeenCalledWith([1]);
      expect(throwableRepository.update).toHaveBeenCalledWith(throwableId, {
        ...mockUpdateThrowableDto,
        image_url: existingThrowable.image_url,
        traits: updatedTraits,
      });
      expect(result).toEqual(updatedThrowable);
    });

    it('should update throwable keeping existing traits when not provided', async () => {
      const throwableId = 1;
      const updateWithoutTraits = { name: 'Updated Name' };
      const existingThrowable = { ...mockThrowable };      throwableRepository.findOne.mockResolvedValueOnce(existingThrowable) // First call in update
        .mockResolvedValueOnce(existingThrowable); // Second call after update
      throwableRepository.update.mockResolvedValue({ affected: 1, raw: {}, generatedMaps: [] });

      const result = await service.update(throwableId, updateWithoutTraits);

      expect(throwableRepository.findOne).toHaveBeenCalledTimes(2);
      expect(traitRepository.findByIds).not.toHaveBeenCalled();
      expect(throwableRepository.update).toHaveBeenCalledWith(throwableId, {
        ...updateWithoutTraits,
        image_url: existingThrowable.image_url,
        traits: existingThrowable.traits,
      });
      expect(result).toEqual(existingThrowable);
    });

    it('should throw NotFoundException when updating non-existent throwable', async () => {
      const throwableId = 999;
      throwableRepository.findOne.mockResolvedValue(null);

      await expect(service.update(throwableId, mockUpdateThrowableDto)).rejects.toThrow(NotFoundException);
      await expect(service.update(throwableId, mockUpdateThrowableDto)).rejects.toThrow('Throwable with ID 999 not found');

      expect(throwableRepository.findOne).toHaveBeenCalledWith({
        where: { id: throwableId },
        relations: ['traits'],
      });
      expect(throwableRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('updateImageUrl', () => {
    it('should update image URL correctly', async () => {
      const throwableId = 1;
      const newImageUrl = 'http://example.com/new-image.png';
      const existingThrowable = { ...mockThrowable };
      const updatedThrowable = { ...existingThrowable, image_url: newImageUrl };

      throwableRepository.findOne.mockResolvedValue(existingThrowable);
      throwableRepository.save.mockResolvedValue(updatedThrowable);

      const result = await service.updateImageUrl(throwableId, newImageUrl);

      expect(throwableRepository.findOne).toHaveBeenCalledWith({ where: { id: throwableId } });
      expect(throwableRepository.save).toHaveBeenCalledWith({
        ...existingThrowable,
        image_url: newImageUrl,
      });
      expect(result).toEqual(updatedThrowable);
    });

    it('should throw NotFoundException when updating image for non-existent throwable', async () => {
      const throwableId = 999;
      const newImageUrl = 'http://example.com/new-image.png';
      throwableRepository.findOne.mockResolvedValue(null);

      await expect(service.updateImageUrl(throwableId, newImageUrl)).rejects.toThrow(NotFoundException);
      await expect(service.updateImageUrl(throwableId, newImageUrl)).rejects.toThrow('Throwable not found');

      expect(throwableRepository.findOne).toHaveBeenCalledWith({ where: { id: throwableId } });
      expect(throwableRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove throwable by ID', async () => {
      const throwableId = 1;
      throwableRepository.delete.mockResolvedValue({ affected: 1, raw: {} });

      await service.remove(throwableId);

      expect(throwableRepository.delete).toHaveBeenCalledWith(throwableId);
    });

    it('should not throw error when removing non-existent throwable', async () => {
      const throwableId = 999;
      throwableRepository.delete.mockResolvedValue({ affected: 0, raw: {} });

      await expect(service.remove(throwableId)).resolves.toBeUndefined();

      expect(throwableRepository.delete).toHaveBeenCalledWith(throwableId);
    });
  });

  describe('validateTraits (private method)', () => {
    it('should validate all traits exist', async () => {
      // Test through the public create method since validateTraits is private
      const validTraits = [mockTrait1, mockTrait2];
      traitRepository.findByIds.mockResolvedValue(validTraits);
      throwableRepository.create.mockReturnValue(mockThrowable);
      throwableRepository.save.mockResolvedValue(mockThrowable);

      await service.create(mockCreateThrowableDto);

      expect(traitRepository.findByIds).toHaveBeenCalledWith([1, 2]);
    });

    it('should handle empty trait IDs array', async () => {
      // Test through the public create method since validateTraits is private
      const dtoWithoutTraits = { ...mockCreateThrowableDto, traits: [] };
      traitRepository.findByIds.mockResolvedValue([]);
      throwableRepository.create.mockReturnValue({ ...mockThrowable, traits: [] });
      throwableRepository.save.mockResolvedValue({ ...mockThrowable, traits: [] });

      await service.create(dtoWithoutTraits);

      expect(traitRepository.findByIds).toHaveBeenCalledWith([]);
    });

    it('should handle null/undefined trait IDs', async () => {
      // Test through the public update method since validateTraits is private
      const throwableId = 1;
      const updateWithoutTraits = { name: 'Updated Name' };
      const existingThrowable = { ...mockThrowable };      throwableRepository.findOne.mockResolvedValueOnce(existingThrowable)
        .mockResolvedValueOnce(existingThrowable);
      throwableRepository.update.mockResolvedValue({ affected: 1, raw: {}, generatedMaps: [] });

      await service.update(throwableId, updateWithoutTraits);

      // validateTraits should not be called when traits is undefined
      expect(traitRepository.findByIds).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException with missing trait IDs', async () => {
      // Test through the public create method since validateTraits is private
      const dtoWithMissingTraits = { ...mockCreateThrowableDto, traits: [1, 2, 999, 888] };
      traitRepository.findByIds.mockResolvedValue([mockTrait1, mockTrait2]); // Missing traits 999, 888

      await expect(service.create(dtoWithMissingTraits)).rejects.toThrow(BadRequestException);
      await expect(service.create(dtoWithMissingTraits)).rejects.toThrow('Invalid trait IDs: 999, 888');

      expect(traitRepository.findByIds).toHaveBeenCalledWith([1, 2, 999, 888]);
    });
  });
});
