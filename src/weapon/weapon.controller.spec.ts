import { Test, TestingModule } from '@nestjs/testing';
import { WeaponController } from './weapon.controller';
import { WeaponService } from './weapon.service';
import { AzureStorageUtil } from '../utils/azure-storage.util';
import { CreateWeaponDto } from './dto/createWeapon.dto';
import { UpdateWeaponDto } from './dto/updateWeapon.dto';
import { Weapon, WeaponCategory, ArmorPenetration } from './weapon.entity';

describe('WeaponController', () => {
  let controller: WeaponController;
  let weaponService: jest.Mocked<WeaponService>;

  // Mock data
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
    image_url: 'https://example.com/test-weapon.jpg',
    traits: [],
    firing_modes: [],
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
  };

  beforeEach(async () => {
    const mockWeaponService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      updateImageUrl: jest.fn(),
    };

    const mockAzureStorageUtil = {
      uploadToAzure: jest.fn(),
      deleteFromAzure: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeaponController],
      providers: [
        {
          provide: WeaponService,
          useValue: mockWeaponService,
        },
        {
          provide: AzureStorageUtil,
          useValue: mockAzureStorageUtil,
        },
      ],
    }).compile();

    controller = module.get<WeaponController>(WeaponController);
    weaponService = module.get(WeaponService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create weapon without image (Azure not set up)', async () => {
      // Arrange
      const expectedWeapon = { ...mockWeapon, image_url: '' };
      weaponService.create.mockResolvedValue(expectedWeapon);

      // Act
      const result = await controller.create(undefined, mockCreateWeaponDto);

      // Assert
      expect(weaponService.create).toHaveBeenCalledWith({
        ...mockCreateWeaponDto,
        imageUrl: '',
      });
      expect(result).toBe(expectedWeapon);
    });

    it('should delegate to service for weapon creation', async () => {
      // Arrange
      weaponService.create.mockResolvedValue(mockWeapon);

      // Act
      await controller.create(undefined, mockCreateWeaponDto);

      // Assert
      expect(weaponService.create).toHaveBeenCalledWith({
        ...mockCreateWeaponDto,
        imageUrl: '',
      });
    });
  });

  describe('findAll', () => {
    it('should return all weapons', async () => {
      // Arrange
      const mockWeaponArray = [mockWeapon];
      weaponService.findAll.mockResolvedValue(mockWeaponArray);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(weaponService.findAll).toHaveBeenCalledWith();
      expect(result).toBe(mockWeaponArray);
    });

    it('should return empty array when no weapons exist', async () => {
      // Arrange
      weaponService.findAll.mockResolvedValue([]);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(weaponService.findAll).toHaveBeenCalledWith();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return weapon by ID', async () => {
      // Arrange
      weaponService.findOne.mockResolvedValue(mockWeapon);

      // Act
      const result = await controller.findOne('1');

      // Assert
      expect(weaponService.findOne).toHaveBeenCalledWith(1);
      expect(result).toBe(mockWeapon);
    });

    it('should convert string ID to number correctly', async () => {
      // Arrange
      weaponService.findOne.mockResolvedValue(mockWeapon);

      // Act
      await controller.findOne('123');

      // Assert
      expect(weaponService.findOne).toHaveBeenCalledWith(123);
    });

    it('should delegate error handling to service', async () => {
      // Arrange
      const error = new Error('Weapon not found');
      weaponService.findOne.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.findOne('999')).rejects.toThrow(error);
      expect(weaponService.findOne).toHaveBeenCalledWith(999);
    });
  });
  describe('update', () => {
    it('should update weapon without changing image (Azure not set up)', async () => {
      // Arrange
      const updatedWeapon = { ...mockWeapon, name: mockUpdateWeaponDto.name, description: mockUpdateWeaponDto.description };
      weaponService.findOne.mockResolvedValue(mockWeapon);
      weaponService.update.mockResolvedValue(updatedWeapon);

      // Act
      const result = await controller.update('1', undefined, mockUpdateWeaponDto);

      // Assert
      expect(weaponService.findOne).toHaveBeenCalledWith(1);
      expect(weaponService.update).toHaveBeenCalledWith(1, {
        ...mockUpdateWeaponDto,
        imageUrl: 'https://example.com/test-weapon.jpg',
      });
      expect(result).toBe(updatedWeapon);
    });

    it('should convert string ID to number correctly', async () => {
      // Arrange
      const updatedWeapon = { ...mockWeapon, name: mockUpdateWeaponDto.name, description: mockUpdateWeaponDto.description };
      weaponService.findOne.mockResolvedValue(mockWeapon);
      weaponService.update.mockResolvedValue(updatedWeapon);

      // Act
      await controller.update('123', undefined, mockUpdateWeaponDto);

      // Assert
      expect(weaponService.findOne).toHaveBeenCalledWith(123);
      expect(weaponService.update).toHaveBeenCalledWith(123, {
        ...mockUpdateWeaponDto,
        imageUrl: 'https://example.com/test-weapon.jpg',
      });
    });

    it('should delegate to service for updates', async () => {
      // Arrange
      const updatedWeapon = { ...mockWeapon, name: mockUpdateWeaponDto.name, description: mockUpdateWeaponDto.description };
      weaponService.findOne.mockResolvedValue(mockWeapon);
      weaponService.update.mockResolvedValue(updatedWeapon);

      // Act
      await controller.update('1', undefined, mockUpdateWeaponDto);

      // Assert
      expect(weaponService.update).toHaveBeenCalledWith(1, {
        ...mockUpdateWeaponDto,
        imageUrl: mockWeapon.image_url,
      });
    });
  });
});
