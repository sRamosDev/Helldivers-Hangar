import { Test, TestingModule } from '@nestjs/testing';
import { GearController } from './gear.controller';
import { GearService } from './gear.service';
import { AzureStorageUtil } from '../utils/azure-storage.util';
import { CreateGearDto } from './dto/createGear.dto';
import { UpdateGearDto } from './dto/updateGear.dto';
import { Gear, GearCategory } from './gear.entity';

describe('GearController', () => {
  let controller: GearController;
  let gearService: jest.Mocked<GearService>;

  // Mock data
  const mockGear: Gear = {
    id: 1,
    name: 'Test Gear',
    description: 'Test gear description',
    type: 'Test Type',
    armor_rating: 100,
    speed: 50,
    stamina_regen: 25,
    image_url: 'https://example.com/test-image.jpg',
    category: GearCategory.ARMOR,
    passive: [],
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
    category: GearCategory.ARMOR,
    passiveIds: [1],
  };

  const mockUpdateGearDto: UpdateGearDto = {
    name: 'Updated Gear',
    description: 'Updated gear description',
  };

  beforeEach(async () => {
    const mockGearService = {
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
      controllers: [GearController],
      providers: [
        {
          provide: GearService,
          useValue: mockGearService,
        },
        {
          provide: AzureStorageUtil,
          useValue: mockAzureStorageUtil,
        },
      ],
    }).compile();

    controller = module.get<GearController>(GearController);
    gearService = module.get(GearService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('create', () => {
    it('should create gear without image (Azure not set up)', async () => {
      // Arrange
      const expectedGear = { ...mockGear, image_url: '' };
      gearService.create.mockResolvedValue(expectedGear);

      // Act
      const result = await controller.create(undefined, mockCreateGearDto);

      // Assert
      expect(gearService.create).toHaveBeenCalledWith({
        ...mockCreateGearDto,
        imageUrl: '',
      });
      expect(result).toBe(expectedGear);
    });

    it('should delegate to service for gear creation', async () => {
      // Arrange
      gearService.create.mockResolvedValue(mockGear);

      // Act
      await controller.create(undefined, mockCreateGearDto);

      // Assert
      expect(gearService.create).toHaveBeenCalledWith({
        ...mockCreateGearDto,
        imageUrl: '',
      });
    });
  });

  describe('findAll', () => {
    it('should return all gear items', async () => {
      // Arrange
      const mockGearArray = [mockGear];
      gearService.findAll.mockResolvedValue(mockGearArray);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(gearService.findAll).toHaveBeenCalledWith();
      expect(result).toBe(mockGearArray);
    });

    it('should return empty array when no gear exists', async () => {
      // Arrange
      gearService.findAll.mockResolvedValue([]);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(gearService.findAll).toHaveBeenCalledWith();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return gear by ID', async () => {
      // Arrange
      gearService.findOne.mockResolvedValue(mockGear);

      // Act
      const result = await controller.findOne('1');

      // Assert
      expect(gearService.findOne).toHaveBeenCalledWith(1);
      expect(result).toBe(mockGear);
    });

    it('should convert string ID to number correctly', async () => {
      // Arrange
      gearService.findOne.mockResolvedValue(mockGear);

      // Act
      await controller.findOne('123');

      // Assert
      expect(gearService.findOne).toHaveBeenCalledWith(123);
    });

    it('should delegate error handling to service', async () => {
      // Arrange
      const error = new Error('Gear not found');
      gearService.findOne.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.findOne('999')).rejects.toThrow(error);
      expect(gearService.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('update', () => {
    it('should update gear without changing image (Azure not set up)', async () => {
      // Arrange
      const updatedGear = { ...mockGear, ...mockUpdateGearDto };
      gearService.findOne.mockResolvedValue(mockGear);
      gearService.update.mockResolvedValue(updatedGear);

      // Act
      const result = await controller.update('1', undefined, mockUpdateGearDto);

      // Assert
      expect(gearService.findOne).toHaveBeenCalledWith(1);
      expect(gearService.update).toHaveBeenCalledWith(1, {
        ...mockUpdateGearDto,
        imageUrl: 'https://example.com/test-image.jpg',
      });
      expect(result).toBe(updatedGear);
    });

    it('should convert string ID to number correctly', async () => {
      // Arrange
      const updatedGear = { ...mockGear, ...mockUpdateGearDto };
      gearService.findOne.mockResolvedValue(mockGear);
      gearService.update.mockResolvedValue(updatedGear);

      // Act
      await controller.update('123', undefined, mockUpdateGearDto);

      // Assert
      expect(gearService.findOne).toHaveBeenCalledWith(123);
      expect(gearService.update).toHaveBeenCalledWith(123, {
        ...mockUpdateGearDto,
        imageUrl: 'https://example.com/test-image.jpg',
      });
    });

    it('should delegate to service for updates', async () => {
      // Arrange
      const updatedGear = { ...mockGear, ...mockUpdateGearDto };
      gearService.findOne.mockResolvedValue(mockGear);
      gearService.update.mockResolvedValue(updatedGear);

      // Act
      await controller.update('1', undefined, mockUpdateGearDto);

      // Assert
      expect(gearService.update).toHaveBeenCalledWith(1, {
        ...mockUpdateGearDto,
        imageUrl: mockGear.image_url,
      });
    });
  });
});
