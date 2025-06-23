import { Test, TestingModule } from '@nestjs/testing';
import { GearService } from './gear.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gear, GearCategory } from './gear.entity';
import { Passive } from '../passive/passive.entity';
import { CreateGearDto } from './dto/createGear.dto';
import { UpdateGearDto } from './dto/updateGear.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('GearService', () => {
  let service: GearService;
  let gearRepository: jest.Mocked<Repository<Gear>>;
  let passiveRepository: jest.Mocked<Repository<Passive>>;

  // Mock data
  const mockPassive1: Passive = {
    id: 1,
    name: 'Test Passive 1',
    description: 'Test passive 1 description',
    gear: [],
  };

  const mockPassive2: Passive = {
    id: 2,
    name: 'Test Passive 2',
    description: 'Test passive 2 description',
    gear: [],
  };
  const mockGear: Gear = {
    id: 1,
    name: 'Test Gear',
    description: 'Test gear description',
    type: 'Test Type',
    armor_rating: 100,
    speed: 50,
    stamina_regen: 25,
    image_url: 'test-image.jpg',
    category: GearCategory.ARMOR,
    passive: [mockPassive1],
    loadouts_helmet: [],
    loadouts_armor: [],
    loadouts_cape: [],
  };

  const mockCreateGearDto: CreateGearDto = {
    name: 'Test Gear',
    description: 'Test gear description',
    type: 'Test Type',
    armor_rating: 100,
    speed: 50,
    stamina_regen: 25,
    imageUrl: 'test-image.jpg',
    category: GearCategory.ARMOR,
    passiveIds: [1],
  };

  const mockUpdateGearDto: UpdateGearDto = {
    name: 'Updated Gear',
    description: 'Updated gear description',
    passiveIds: [1, 2],
  };

  beforeEach(async () => {
    // Create mock repositories
    const mockGearRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      merge: jest.fn(),
      delete: jest.fn(),
    };

    const mockPassiveRepository = {
      findByIds: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GearService,
        {
          provide: getRepositoryToken(Gear),
          useValue: mockGearRepository,
        },
        {
          provide: getRepositoryToken(Passive),
          useValue: mockPassiveRepository,
        },
      ],
    }).compile();

    service = module.get<GearService>(GearService);
    gearRepository = module.get(getRepositoryToken(Gear));
    passiveRepository = module.get(getRepositoryToken(Passive));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create gear with valid passives', async () => {
      // Arrange
      passiveRepository.findByIds.mockResolvedValue([mockPassive1]);
      gearRepository.create.mockReturnValue(mockGear);
      gearRepository.save.mockResolvedValue(mockGear);

      // Act
      const result = await service.create(mockCreateGearDto);

      // Assert
      expect(passiveRepository.findByIds).toHaveBeenCalledWith([1]);
      expect(gearRepository.create).toHaveBeenCalledWith({
        ...mockCreateGearDto,
        image_url: mockCreateGearDto.imageUrl,
        passive: [mockPassive1],
      });
      expect(gearRepository.save).toHaveBeenCalledWith(mockGear);
      expect(result).toEqual(mockGear);
    });

    it('should create gear without passives', async () => {
      // Arrange
      const createDtoNoPassives = { ...mockCreateGearDto, passiveIds: [] };
      const gearNoPassives = { ...mockGear, passive: [] };
      
      passiveRepository.findByIds.mockResolvedValue([]);
      gearRepository.create.mockReturnValue(gearNoPassives);
      gearRepository.save.mockResolvedValue(gearNoPassives);

      // Act
      const result = await service.create(createDtoNoPassives);

      // Assert
      expect(passiveRepository.findByIds).toHaveBeenCalledWith([]);
      expect(gearRepository.create).toHaveBeenCalledWith({
        ...createDtoNoPassives,
        image_url: createDtoNoPassives.imageUrl,
        passive: [],
      });
      expect(result).toEqual(gearNoPassives);
    });

    it('should throw BadRequestException with invalid passive IDs', async () => {
      // Arrange
      passiveRepository.findByIds.mockResolvedValue([mockPassive1]); // Only returns 1 passive for 2 requested IDs

      const createDtoInvalidPassives = { ...mockCreateGearDto, passiveIds: [1, 999] };

      // Act & Assert
      await expect(service.create(createDtoInvalidPassives)).rejects.toThrow(
        new BadRequestException('Invalid passive IDs: 999')
      );
      expect(passiveRepository.findByIds).toHaveBeenCalledWith([1, 999]);
    });
  });

  describe('findAll', () => {
    it('should return all gear items', async () => {
      // Arrange
      const mockGearArray = [mockGear];
      gearRepository.find.mockResolvedValue(mockGearArray);

      // Act
      const result = await service.findAll();

      // Assert
      expect(gearRepository.find).toHaveBeenCalledWith();
      expect(result).toEqual(mockGearArray);
    });

    it('should return empty array when no gear exists', async () => {
      // Arrange
      gearRepository.find.mockResolvedValue([]);

      // Act
      const result = await service.findAll();

      // Assert
      expect(gearRepository.find).toHaveBeenCalledWith();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return gear by ID with relations', async () => {
      // Arrange
      gearRepository.findOne.mockResolvedValue(mockGear);

      // Act
      const result = await service.findOne(1);

      // Assert
      expect(gearRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['passive'],
      });
      expect(result).toEqual(mockGear);
    });

    it('should throw NotFoundException when gear not found', async () => {
      // Arrange
      gearRepository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.findOne(999)).rejects.toThrow(
        new NotFoundException('Gear with ID 999 not found')
      );
      expect(gearRepository.findOne).toHaveBeenCalledWith({
        where: { id: 999 },
        relations: ['passive'],
      });
    });
  });

  describe('update', () => {
    it('should update gear with new data', async () => {
      // Arrange
      const updatedGear = { ...mockGear, ...mockUpdateGearDto, passive: [mockPassive1, mockPassive2] };
      
      gearRepository.findOne.mockResolvedValue(mockGear);
      passiveRepository.findByIds.mockResolvedValue([mockPassive1, mockPassive2]);
      gearRepository.merge.mockReturnValue(updatedGear);
      gearRepository.save.mockResolvedValue(updatedGear);

      // Act
      const result = await service.update(1, mockUpdateGearDto);

      // Assert
      expect(gearRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(passiveRepository.findByIds).toHaveBeenCalledWith([1, 2]);
      expect(gearRepository.merge).toHaveBeenCalledWith(mockGear, {
        ...mockUpdateGearDto,
        image_url: mockGear.image_url, // Should keep existing image_url when not provided
        passive: [mockPassive1, mockPassive2],
      });
      expect(gearRepository.save).toHaveBeenCalledWith(updatedGear);
      expect(result).toEqual(updatedGear);
    });

    it('should update gear with new passives', async () => {
      // Arrange
      const updateDtoNewPassives = { ...mockUpdateGearDto, passiveIds: [2] };
      const updatedGear = { ...mockGear, passive: [mockPassive2] };
      
      gearRepository.findOne.mockResolvedValue(mockGear);
      passiveRepository.findByIds.mockResolvedValue([mockPassive2]);
      gearRepository.merge.mockReturnValue(updatedGear);
      gearRepository.save.mockResolvedValue(updatedGear);

      // Act
      const result = await service.update(1, updateDtoNewPassives);

      // Assert
      expect(passiveRepository.findByIds).toHaveBeenCalledWith([2]);
      expect(gearRepository.merge).toHaveBeenCalledWith(mockGear, {
        ...updateDtoNewPassives,
        image_url: mockGear.image_url,
        passive: [mockPassive2],
      });
      expect(result).toEqual(updatedGear);
    });

    it('should update gear keeping existing passives when not provided', async () => {
      // Arrange
      const updateDtoNoPassives = { name: 'Updated Name' };
      const updatedGear = { ...mockGear, name: 'Updated Name' };
      
      gearRepository.findOne.mockResolvedValue(mockGear);
      gearRepository.merge.mockReturnValue(updatedGear);
      gearRepository.save.mockResolvedValue(updatedGear);

      // Act
      const result = await service.update(1, updateDtoNoPassives);

      // Assert
      expect(passiveRepository.findByIds).not.toHaveBeenCalled();
      expect(gearRepository.merge).toHaveBeenCalledWith(mockGear, {
        ...updateDtoNoPassives,
        image_url: mockGear.image_url,
        passive: mockGear.passive, // Should keep existing passives
      });
      expect(result).toEqual(updatedGear);
    });

    it('should throw NotFoundException when gear not found', async () => {
      // Arrange
      gearRepository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.update(999, mockUpdateGearDto)).rejects.toThrow(
        new NotFoundException('Gear with ID 999 not found')
      );
      expect(gearRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });

  describe('updateImageUrl', () => {
    it('should update image URL correctly', async () => {
      // Arrange
      const newImageUrl = 'new-image.jpg';
      const updatedGear = { ...mockGear, image_url: newImageUrl };
      
      gearRepository.findOne.mockResolvedValue(mockGear);
      gearRepository.save.mockResolvedValue(updatedGear);

      // Act
      const result = await service.updateImageUrl(1, newImageUrl);

      // Assert
      expect(gearRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(gearRepository.save).toHaveBeenCalledWith({
        ...mockGear,
        image_url: newImageUrl,
      });
      expect(result).toEqual(updatedGear);
    });

    it('should throw NotFoundException when gear not found', async () => {
      // Arrange
      gearRepository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.updateImageUrl(999, 'new-image.jpg')).rejects.toThrow(
        new NotFoundException('Gear with ID 999 not found')
      );
      expect(gearRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });

  describe('remove', () => {
    it('should remove gear by ID', async () => {
      // Arrange
      gearRepository.delete.mockResolvedValue({ affected: 1, raw: {} });

      // Act
      await service.remove(1);

      // Assert
      expect(gearRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should not throw error when removing non-existent gear', async () => {
      // Arrange
      gearRepository.delete.mockResolvedValue({ affected: 0, raw: {} });

      // Act & Assert
      await expect(service.remove(999)).resolves.toBeUndefined();
      expect(gearRepository.delete).toHaveBeenCalledWith(999);
    });
  });

  describe('validatePassives (private method)', () => {
    it('should validate all passives exist', async () => {
      // Arrange
      const createDtoWithPassives = { ...mockCreateGearDto, passiveIds: [1, 2] };
      passiveRepository.findByIds.mockResolvedValue([mockPassive1, mockPassive2]);
      gearRepository.create.mockReturnValue(mockGear);
      gearRepository.save.mockResolvedValue(mockGear);

      // Act
      await service.create(createDtoWithPassives);

      // Assert
      expect(passiveRepository.findByIds).toHaveBeenCalledWith([1, 2]);
    });

    it('should handle empty passive IDs array', async () => {
      // Arrange
      const createDtoNoPassives = { ...mockCreateGearDto, passiveIds: [] };
      const gearNoPassives = { ...mockGear, passive: [] };
      
      passiveRepository.findByIds.mockResolvedValue([]);
      gearRepository.create.mockReturnValue(gearNoPassives);
      gearRepository.save.mockResolvedValue(gearNoPassives);

      // Act
      const result = await service.create(createDtoNoPassives);

      // Assert
      expect(passiveRepository.findByIds).toHaveBeenCalledWith([]);
      expect(result.passive).toEqual([]);
    });    it('should handle null/undefined passive IDs', async () => {
      // Arrange
      const createDtoNullPassives = { ...mockCreateGearDto, passiveIds: null as any };
      const gearNoPassives = { ...mockGear, passive: [] };
      
      gearRepository.create.mockReturnValue(gearNoPassives);
      gearRepository.save.mockResolvedValue(gearNoPassives);

      // Act
      const result = await service.create(createDtoNullPassives);

      // Assert
      expect(passiveRepository.findByIds).not.toHaveBeenCalled(); // Should not be called due to early return
      expect(result.passive).toEqual([]);
    });
  });

  describe('verifyGearExists (private method)', () => {
    it('should verify gear exists before operations', async () => {
      // Arrange
      gearRepository.findOne.mockResolvedValue(mockGear);
      gearRepository.save.mockResolvedValue(mockGear);

      // Act
      await service.updateImageUrl(1, 'new-image.jpg');

      // Assert
      expect(gearRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException when verifying non-existent gear', async () => {
      // Arrange
      gearRepository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.updateImageUrl(999, 'new-image.jpg')).rejects.toThrow(
        new NotFoundException('Gear with ID 999 not found')
      );
    });
  });
});
