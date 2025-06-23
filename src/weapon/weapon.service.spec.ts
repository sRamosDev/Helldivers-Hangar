import { Test, TestingModule } from '@nestjs/testing';
import { WeaponService } from './weapon.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Weapon, WeaponCategory, ArmorPenetration } from './weapon.entity';
import { Trait } from '../trait/trait.entity';
import { FiringMode } from '../firingMode/firingMode.entity';
import { CreateWeaponDto } from './dto/createWeapon.dto';
import { UpdateWeaponDto } from './dto/updateWeapon.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('WeaponService', () => {
  let service: WeaponService;
  let weaponRepository: jest.Mocked<Repository<Weapon>>;
  let traitRepository: jest.Mocked<Repository<Trait>>;
  let fireModeRepository: jest.Mocked<Repository<FiringMode>>;
  // Mock data
  const mockTrait1: Trait = {
    id: 1,
    name: 'Test Trait 1',
  };

  const mockTrait2: Trait = {
    id: 2,
    name: 'Test Trait 2',
  };

  const mockFiringMode1: FiringMode = {
    id: 1,
    name: 'Semi-Auto',
    primary_weapons: [],
  };

  const mockFiringMode2: FiringMode = {
    id: 2,
    name: 'Full-Auto',
    primary_weapons: [],
  };

  const mockWeapon: Weapon = {
    id: 1,
    name: 'Test Weapon',
    description: 'Test weapon description',
    type: 'Assault Rifle',
    damage: 100,
    capacity: 30,
    recoil: 50,
    fire_rate: 600,
    max_penetration: ArmorPenetration.Medium,
    category: WeaponCategory.PRIMARY,
    image_url: 'test-weapon.jpg',
    traits: [mockTrait1],
    firing_modes: [mockFiringMode1],
    loadouts_primary: [],
    loadouts_secondary: [],
  };
  const mockCreateWeaponDto: CreateWeaponDto = {
    name: 'Test Weapon',
    description: 'Test weapon description',
    type: 'Assault Rifle',
    damage: 100,
    capacity: 30,
    recoil: 50,
    fire_rate: 600,
    max_penetration: ArmorPenetration.Medium,
    category: WeaponCategory.PRIMARY,
    imageUrl: 'test-weapon.jpg',
    traits: [1],
    firing_modes: [1],
  };

  const mockUpdateWeaponDto: UpdateWeaponDto = {
    name: 'Updated Weapon',
    description: 'Updated weapon description',
    traits: [1, 2],
    firing_modes: [1, 2],
  };

  beforeEach(async () => {
    // Create mock repositories
    const mockWeaponRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      merge: jest.fn(),
      delete: jest.fn(),
    };

    const mockTraitRepository = {
      findByIds: jest.fn(),
    };

    const mockFireModeRepository = {
      findByIds: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeaponService,
        {
          provide: getRepositoryToken(Weapon),
          useValue: mockWeaponRepository,
        },
        {
          provide: getRepositoryToken(Trait),
          useValue: mockTraitRepository,
        },
        {
          provide: getRepositoryToken(FiringMode),
          useValue: mockFireModeRepository,
        },
      ],
    }).compile();

    service = module.get<WeaponService>(WeaponService);
    weaponRepository = module.get(getRepositoryToken(Weapon));
    traitRepository = module.get(getRepositoryToken(Trait));
    fireModeRepository = module.get(getRepositoryToken(FiringMode));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create weapon with traits and firing modes', async () => {
      // Arrange
      traitRepository.findByIds.mockResolvedValue([mockTrait1]);
      fireModeRepository.findByIds.mockResolvedValue([mockFiringMode1]);
      weaponRepository.create.mockReturnValue(mockWeapon);
      weaponRepository.save.mockResolvedValue(mockWeapon);

      // Act
      const result = await service.create(mockCreateWeaponDto);

      // Assert
      expect(traitRepository.findByIds).toHaveBeenCalledWith([1]);
      expect(fireModeRepository.findByIds).toHaveBeenCalledWith([1]);
      expect(weaponRepository.create).toHaveBeenCalledWith({
        ...mockCreateWeaponDto,
        traits: [mockTrait1],
        firing_modes: [mockFiringMode1],
      });
      expect(weaponRepository.save).toHaveBeenCalledWith(mockWeapon);
      expect(result).toEqual(mockWeapon);
    });

    it('should throw BadRequestException with invalid trait IDs', async () => {
      // Arrange
      traitRepository.findByIds.mockResolvedValue([mockTrait1]); // Only returns 1 trait for 2 requested IDs
      fireModeRepository.findByIds.mockResolvedValue([mockFiringMode1]);

      const createDtoInvalidTraits = { ...mockCreateWeaponDto, traits: [1, 999] };

      // Act & Assert
      await expect(service.create(createDtoInvalidTraits)).rejects.toThrow(
        new BadRequestException('Invalid trait IDs: 999')
      );
      expect(traitRepository.findByIds).toHaveBeenCalledWith([1, 999]);
    });

    it('should throw BadRequestException with invalid firing mode IDs', async () => {
      // Arrange
      traitRepository.findByIds.mockResolvedValue([mockTrait1]);
      fireModeRepository.findByIds.mockResolvedValue([mockFiringMode1]); // Only returns 1 firing mode for 2 requested IDs

      const createDtoInvalidFiringModes = { ...mockCreateWeaponDto, firing_modes: [1, 999] };

      // Act & Assert
      await expect(service.create(createDtoInvalidFiringModes)).rejects.toThrow(
        new BadRequestException('Invalid trait IDs: 999')
      );
      expect(fireModeRepository.findByIds).toHaveBeenCalledWith([1, 999]);
    });
  });

  describe('findAll', () => {
    it('should return all weapons', async () => {
      // Arrange
      const mockWeaponArray = [mockWeapon];
      weaponRepository.find.mockResolvedValue(mockWeaponArray);

      // Act
      const result = await service.findAll();

      // Assert
      expect(weaponRepository.find).toHaveBeenCalledWith();
      expect(result).toEqual(mockWeaponArray);
    });

    it('should return empty array when no weapons exist', async () => {
      // Arrange
      weaponRepository.find.mockResolvedValue([]);

      // Act
      const result = await service.findAll();

      // Assert
      expect(weaponRepository.find).toHaveBeenCalledWith();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return weapon by ID with relations', async () => {
      // Arrange
      weaponRepository.findOne.mockResolvedValue(mockWeapon);

      // Act
      const result = await service.findOne(1);

      // Assert
      expect(weaponRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['traits', 'firing_modes'],
      });
      expect(result).toEqual(mockWeapon);
    });

    it('should return null when weapon not found', async () => {
      // Arrange
      weaponRepository.findOne.mockResolvedValue(null);

      // Act
      const result = await service.findOne(999);

      // Assert
      expect(weaponRepository.findOne).toHaveBeenCalledWith({
        where: { id: 999 },
        relations: ['traits', 'firing_modes'],
      });
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update weapon with new data', async () => {
      // Arrange
      const updatedWeapon = { 
        ...mockWeapon, 
        ...mockUpdateWeaponDto, 
        traits: [mockTrait1, mockTrait2], 
        firing_modes: [mockFiringMode1, mockFiringMode2] 
      };
      
      weaponRepository.findOne.mockResolvedValue(mockWeapon);
      traitRepository.findByIds.mockResolvedValue([mockTrait1, mockTrait2]);
      fireModeRepository.findByIds.mockResolvedValue([mockFiringMode1, mockFiringMode2]);
      weaponRepository.merge.mockReturnValue(updatedWeapon);
      weaponRepository.save.mockResolvedValue(updatedWeapon);

      // Act
      const result = await service.update(1, mockUpdateWeaponDto);

      // Assert
      expect(weaponRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(traitRepository.findByIds).toHaveBeenCalledWith([1, 2]);
      expect(fireModeRepository.findByIds).toHaveBeenCalledWith([1, 2]);
      expect(weaponRepository.merge).toHaveBeenCalledWith(mockWeapon, {
        ...mockUpdateWeaponDto,
        traits: [mockTrait1, mockTrait2],
        firing_modes: [mockFiringMode1, mockFiringMode2],
      });
      expect(weaponRepository.save).toHaveBeenCalledWith(updatedWeapon);
      expect(result).toEqual(updatedWeapon);
    });

    it('should throw NotFoundException when weapon not found', async () => {
      // Arrange
      weaponRepository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.update(999, mockUpdateWeaponDto)).rejects.toThrow(
        new NotFoundException('Weapon with ID 999 not found')
      );
      expect(weaponRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });

  describe('updateImageUrl', () => {
    it('should update image URL correctly', async () => {
      // Arrange
      const newImageUrl = 'new-weapon-image.jpg';
      const updatedWeapon = { ...mockWeapon, image_url: newImageUrl };
      
      weaponRepository.findOne.mockResolvedValue(mockWeapon);
      weaponRepository.save.mockResolvedValue(updatedWeapon);

      // Act
      const result = await service.updateImageUrl(1, newImageUrl);

      // Assert
      expect(weaponRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(weaponRepository.save).toHaveBeenCalledWith({
        ...mockWeapon,
        image_url: newImageUrl,
      });
      expect(result).toEqual(updatedWeapon);
    });

    it('should throw NotFoundException when weapon not found', async () => {
      // Arrange
      weaponRepository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.updateImageUrl(999, 'new-image.jpg')).rejects.toThrow(
        new NotFoundException('Weapon with ID 999 not found')
      );
      expect(weaponRepository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });

  describe('remove', () => {
    it('should remove weapon by ID', async () => {
      // Arrange
      weaponRepository.delete.mockResolvedValue({ affected: 1, raw: {} });

      // Act
      await service.remove(1);

      // Assert
      expect(weaponRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should not throw error when removing non-existent weapon', async () => {
      // Arrange
      weaponRepository.delete.mockResolvedValue({ affected: 0, raw: {} });

      // Act & Assert
      await expect(service.remove(999)).resolves.toBeUndefined();
      expect(weaponRepository.delete).toHaveBeenCalledWith(999);
    });
  });

  describe('validateTraits (private method)', () => {
    it('should validate all traits exist', async () => {
      // Arrange
      const createDtoWithTraits = { ...mockCreateWeaponDto, traits: [1, 2] };
      traitRepository.findByIds.mockResolvedValue([mockTrait1, mockTrait2]);
      fireModeRepository.findByIds.mockResolvedValue([mockFiringMode1]);
      weaponRepository.create.mockReturnValue(mockWeapon);
      weaponRepository.save.mockResolvedValue(mockWeapon);

      // Act
      await service.create(createDtoWithTraits);

      // Assert
      expect(traitRepository.findByIds).toHaveBeenCalledWith([1, 2]);
    });

    it('should throw BadRequestException with missing trait IDs', async () => {
      // Arrange
      const createDtoWithMissingTraits = { ...mockCreateWeaponDto, traits: [1, 2, 999] };
      traitRepository.findByIds.mockResolvedValue([mockTrait1, mockTrait2]); // Missing trait 999
      fireModeRepository.findByIds.mockResolvedValue([mockFiringMode1]);

      // Act & Assert
      await expect(service.create(createDtoWithMissingTraits)).rejects.toThrow(
        new BadRequestException('Invalid trait IDs: 999')
      );
    });
  });

  describe('validateFiringMode (private method)', () => {
    it('should validate all firing modes exist', async () => {
      // Arrange
      const createDtoWithFiringModes = { ...mockCreateWeaponDto, firing_modes: [1, 2] };
      traitRepository.findByIds.mockResolvedValue([mockTrait1]);
      fireModeRepository.findByIds.mockResolvedValue([mockFiringMode1, mockFiringMode2]);
      weaponRepository.create.mockReturnValue(mockWeapon);
      weaponRepository.save.mockResolvedValue(mockWeapon);

      // Act
      await service.create(createDtoWithFiringModes);

      // Assert
      expect(fireModeRepository.findByIds).toHaveBeenCalledWith([1, 2]);
    });

    it('should throw BadRequestException with missing firing mode IDs', async () => {
      // Arrange
      const createDtoWithMissingFiringModes = { ...mockCreateWeaponDto, firing_modes: [1, 2, 999] };
      traitRepository.findByIds.mockResolvedValue([mockTrait1]);
      fireModeRepository.findByIds.mockResolvedValue([mockFiringMode1, mockFiringMode2]); // Missing firing mode 999

      // Act & Assert
      await expect(service.create(createDtoWithMissingFiringModes)).rejects.toThrow(
        new BadRequestException('Invalid trait IDs: 999')
      );
    });
  });

  describe('verifyWeaponExists (private method)', () => {
    it('should verify weapon exists before operations', async () => {
      // Arrange
      weaponRepository.findOne.mockResolvedValue(mockWeapon);
      weaponRepository.save.mockResolvedValue(mockWeapon);

      // Act
      await service.updateImageUrl(1, 'new-image.jpg');

      // Assert
      expect(weaponRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException when verifying non-existent weapon', async () => {
      // Arrange
      weaponRepository.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.updateImageUrl(999, 'new-image.jpg')).rejects.toThrow(
        new NotFoundException('Weapon with ID 999 not found')
      );
    });
  });
});
