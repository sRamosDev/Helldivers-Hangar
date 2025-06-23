import { Test, TestingModule } from '@nestjs/testing';
import { PassiveController } from './passive.controller';
import { PassiveService } from './passive.service';
import { CreatePassiveDto } from './dto/createPassive.dto';
import { UpdatePassiveDto } from './dto/updatePassive.dto';
import { Passive } from './passive.entity';

describe('PassiveController', () => {
  let controller: PassiveController;
  let service: jest.Mocked<PassiveService>;

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
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassiveController],
      providers: [
        {
          provide: PassiveService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PassiveController>(PassiveController);
    service = module.get(PassiveService);

    // Reset all mocks before each test
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all passives', async () => {
      const mockPassives = [mockPassive, { ...mockPassive, id: 2, name: 'Shield Boost' }];
      service.findAll.mockResolvedValue(mockPassives);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalledWith();
      expect(result).toEqual(mockPassives);
    });

    it('should delegate to service for find operations', async () => {
      service.findAll.mockResolvedValue([]);

      await controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no passives exist', async () => {
      service.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return passive by ID', async () => {
      const passiveId = 1;
      service.findOne.mockResolvedValue(mockPassive);

      const result = await controller.findOne(passiveId);

      expect(service.findOne).toHaveBeenCalledWith(passiveId);
      expect(result).toEqual(mockPassive);
    });

    it('should delegate to service for find by ID', async () => {
      const passiveId = 1;
      service.findOne.mockResolvedValue(mockPassive);

      await controller.findOne(passiveId);

      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(passiveId);
    });

    it('should handle service exceptions', async () => {
      const passiveId = 999;
      const error = new Error('Passive not found');
      service.findOne.mockRejectedValue(error);

      await expect(controller.findOne(passiveId)).rejects.toThrow(error);

      expect(service.findOne).toHaveBeenCalledWith(passiveId);
    });
  });

  describe('create', () => {
    it('should create new passive', async () => {
      const expectedPassive = { ...mockPassive };
      service.create.mockResolvedValue(expectedPassive);

      const result = await controller.create(mockCreatePassiveDto);

      expect(service.create).toHaveBeenCalledWith(mockCreatePassiveDto);
      expect(result).toEqual(expectedPassive);
    });

    it('should delegate to service correctly', async () => {
      service.create.mockResolvedValue(mockPassive);

      await controller.create(mockCreatePassiveDto);

      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(mockCreatePassiveDto);
    });

    it('should handle service exceptions during creation', async () => {
      const error = new Error('Creation failed');
      service.create.mockRejectedValue(error);

      await expect(controller.create(mockCreatePassiveDto)).rejects.toThrow(error);

      expect(service.create).toHaveBeenCalledWith(mockCreatePassiveDto);
    });
  });

  describe('update', () => {
    it('should update passive by ID', async () => {
      const passiveId = 1;
      const updatedPassive = { ...mockPassive, ...mockUpdatePassiveDto };
      service.update.mockResolvedValue(updatedPassive);

      const result = await controller.update(passiveId, mockUpdatePassiveDto);

      expect(service.update).toHaveBeenCalledWith(passiveId, mockUpdatePassiveDto);
      expect(result).toEqual(updatedPassive);
    });

    it('should delegate to service for updates', async () => {
      const passiveId = 1;
      service.update.mockResolvedValue(mockPassive);

      await controller.update(passiveId, mockUpdatePassiveDto);

      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenCalledWith(passiveId, mockUpdatePassiveDto);
    });

    it('should handle service exceptions during update', async () => {
      const passiveId = 1;
      const error = new Error('Update failed');
      service.update.mockRejectedValue(error);

      await expect(controller.update(passiveId, mockUpdatePassiveDto)).rejects.toThrow(error);

      expect(service.update).toHaveBeenCalledWith(passiveId, mockUpdatePassiveDto);
    });

    it('should handle partial updates', async () => {
      const passiveId = 1;
      const partialUpdate = { name: 'Updated Name' };
      const updatedPassive = { ...mockPassive, name: 'Updated Name' };
      service.update.mockResolvedValue(updatedPassive);

      const result = await controller.update(passiveId, partialUpdate);

      expect(service.update).toHaveBeenCalledWith(passiveId, partialUpdate);
      expect(result).toEqual(updatedPassive);
    });
  });

  describe('remove', () => {
    it('should remove passive by ID', async () => {
      const passiveId = 1;
      service.remove.mockResolvedValue();

      await controller.remove(passiveId);

      expect(service.remove).toHaveBeenCalledWith(passiveId);
    });

    it('should delegate to service for deletion', async () => {
      const passiveId = 1;
      service.remove.mockResolvedValue();

      await controller.remove(passiveId);

      expect(service.remove).toHaveBeenCalledTimes(1);
      expect(service.remove).toHaveBeenCalledWith(passiveId);
    });

    it('should handle service exceptions during removal', async () => {
      const passiveId = 1;
      const error = new Error('Removal failed');
      service.remove.mockRejectedValue(error);

      await expect(controller.remove(passiveId)).rejects.toThrow(error);

      expect(service.remove).toHaveBeenCalledWith(passiveId);
    });

    it('should return void on successful removal', async () => {
      const passiveId = 1;
      service.remove.mockResolvedValue();

      const result = await controller.remove(passiveId);

      expect(result).toBeUndefined();
    });
  });

  describe('controller methods', () => {
    it('should have all required methods defined', () => {
      expect(controller.findAll).toBeDefined();
      expect(controller.findOne).toBeDefined();
      expect(controller.create).toBeDefined();
      expect(controller.update).toBeDefined();
      expect(controller.remove).toBeDefined();
    });

    it('should delegate all operations to service without modification', async () => {
      const passiveId = 1;
      
      // Test all delegations
      service.findAll.mockResolvedValue([mockPassive]);
      service.findOne.mockResolvedValue(mockPassive);
      service.create.mockResolvedValue(mockPassive);
      service.update.mockResolvedValue(mockPassive);
      service.remove.mockResolvedValue();

      await controller.findAll();
      await controller.findOne(passiveId);
      await controller.create(mockCreatePassiveDto);
      await controller.update(passiveId, mockUpdatePassiveDto);
      await controller.remove(passiveId);

      expect(service.findAll).toHaveBeenCalledWith();
      expect(service.findOne).toHaveBeenCalledWith(passiveId);
      expect(service.create).toHaveBeenCalledWith(mockCreatePassiveDto);
      expect(service.update).toHaveBeenCalledWith(passiveId, mockUpdatePassiveDto);
      expect(service.remove).toHaveBeenCalledWith(passiveId);
    });
  });
});
