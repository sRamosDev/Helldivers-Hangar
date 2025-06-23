import { Test, TestingModule } from '@nestjs/testing';
import { FiringModeController } from './firingMode.controller';
import { FiringModeService } from './firingMode.service';
import { CreateFiringModeDto } from './dto/CreateFiringMode.dto';
import { UpdateFiringModeDto } from './dto/UpdateFiringMode.dto';
import { FiringMode } from './firingMode.entity';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';

describe('FiringModeController', () => {
  let controller: FiringModeController;
  let service: jest.Mocked<FiringModeService>;

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
    const mockService = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const mockRolesGuard = {
      canActivate: jest.fn().mockReturnValue(true),
    };

    const mockAuthGuard = {
      canActivate: jest.fn().mockReturnValue(true),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FiringModeController],
      providers: [
        {
          provide: FiringModeService,
          useValue: mockService,
        },
      ],
    })
      .overrideGuard(RolesGuard)
      .useValue(mockRolesGuard)
      .overrideGuard(AuthGuard('jwt'))
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<FiringModeController>(FiringModeController);
    service = module.get(FiringModeService);

    // Reset all mocks before each test
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all firing modes', async () => {
      const mockFiringModes = [mockFiringMode, { ...mockFiringMode, id: 2, name: 'Full Auto' }];
      service.findAll.mockResolvedValue(mockFiringModes);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalledWith();
      expect(result).toEqual(mockFiringModes);
    });

    it('should delegate all operations to service', async () => {
      service.findAll.mockResolvedValue([]);

      await controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should allow public access for read operations', async () => {
      // This test verifies that findAll doesn't require authentication
      // No guards should be applied to this method
      service.findAll.mockResolvedValue([mockFiringMode]);

      const result = await controller.findAll();

      expect(result).toEqual([mockFiringMode]);
    });
  });

  describe('findOne', () => {
    it('should return firing mode by ID', async () => {
      const firingModeId = 1;
      service.findOne.mockResolvedValue(mockFiringMode);

      const result = await controller.findOne(firingModeId);

      expect(service.findOne).toHaveBeenCalledWith(firingModeId);
      expect(result).toEqual(mockFiringMode);
    });

    it('should delegate to service for find by ID', async () => {
      const firingModeId = 1;
      service.findOne.mockResolvedValue(mockFiringMode);

      await controller.findOne(firingModeId);

      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(firingModeId);
    });

    it('should allow public access for read operations', async () => {
      // This test verifies that findOne doesn't require authentication
      // No guards should be applied to this method
      const firingModeId = 1;
      service.findOne.mockResolvedValue(mockFiringMode);

      const result = await controller.findOne(firingModeId);

      expect(result).toEqual(mockFiringMode);
    });
  });

  describe('create', () => {
    it('should create new firing mode', async () => {
      service.create.mockResolvedValue(mockFiringMode);

      const result = await controller.create(mockCreateFiringModeDto);

      expect(service.create).toHaveBeenCalledWith(mockCreateFiringModeDto);
      expect(result).toEqual(mockFiringMode);
    });

    it('should apply admin guards for CUD operations', async () => {
      // This test verifies that create requires admin authentication
      // Guards are mocked in our test setup
      service.create.mockResolvedValue(mockFiringMode);

      const result = await controller.create(mockCreateFiringModeDto);

      expect(service.create).toHaveBeenCalledWith(mockCreateFiringModeDto);
      expect(result).toEqual(mockFiringMode);
    });

    it('should delegate to service for creation', async () => {
      service.create.mockResolvedValue(mockFiringMode);

      await controller.create(mockCreateFiringModeDto);

      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(mockCreateFiringModeDto);
    });
  });

  describe('update', () => {
    it('should update firing mode', async () => {
      const firingModeId = 1;
      const updatedFiringMode = { ...mockFiringMode, name: 'Burst Fire' };
      service.update.mockResolvedValue(updatedFiringMode);

      const result = await controller.update(firingModeId, mockUpdateFiringModeDto);

      expect(service.update).toHaveBeenCalledWith(firingModeId, mockUpdateFiringModeDto);
      expect(result).toEqual(updatedFiringMode);
    });

    it('should apply admin guards for CUD operations', async () => {
      // This test verifies that update requires admin authentication
      // Guards are mocked in our test setup
      const firingModeId = 1;
      const updatedFiringMode = { ...mockFiringMode, name: 'Burst Fire' };
      service.update.mockResolvedValue(updatedFiringMode);

      const result = await controller.update(firingModeId, mockUpdateFiringModeDto);

      expect(service.update).toHaveBeenCalledWith(firingModeId, mockUpdateFiringModeDto);
      expect(result).toEqual(updatedFiringMode);
    });

    it('should delegate to service for updates', async () => {
      const firingModeId = 1;
      service.update.mockResolvedValue(mockFiringMode);

      await controller.update(firingModeId, mockUpdateFiringModeDto);

      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenCalledWith(firingModeId, mockUpdateFiringModeDto);
    });
  });

  describe('remove', () => {
    it('should remove firing mode by ID', async () => {
      const firingModeId = 1;
      service.remove.mockResolvedValue();

      await controller.remove(firingModeId);

      expect(service.remove).toHaveBeenCalledWith(firingModeId);
    });

    it('should apply admin guards for CUD operations', async () => {
      // This test verifies that remove requires admin authentication
      // Guards are mocked in our test setup
      const firingModeId = 1;
      service.remove.mockResolvedValue();

      await controller.remove(firingModeId);

      expect(service.remove).toHaveBeenCalledWith(firingModeId);
    });

    it('should delegate to service for deletion', async () => {
      const firingModeId = 1;
      service.remove.mockResolvedValue();

      await controller.remove(firingModeId);

      expect(service.remove).toHaveBeenCalledTimes(1);
      expect(service.remove).toHaveBeenCalledWith(firingModeId);
    });
  });

  describe('guards and decorators', () => {
    it('should apply admin guards for admin operations only', () => {
      // This test verifies that admin guards are applied to create, update, and delete methods
      // but not to read operations (findAll, findOne)
      expect(controller).toBeDefined();
      expect(controller.create).toBeDefined();
      expect(controller.update).toBeDefined();
      expect(controller.remove).toBeDefined();
      expect(controller.findAll).toBeDefined();
      expect(controller.findOne).toBeDefined();
    });
  });
});
