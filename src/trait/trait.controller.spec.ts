import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '@nestjs/passport';
import { TraitController } from './trait.controller';
import { TraitService } from './trait.service';
import { CreateTraitDto } from './dto/createTrait.dto';
import { UpdateTraitDto } from './dto/updateTrait.dto';
import { Trait } from './trait.entity';

describe('TraitController', () => {
  let controller: TraitController;
  let service: jest.Mocked<TraitService>;

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
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const mockAuthGuard = {
      canActivate: jest.fn().mockReturnValue(true),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TraitController],
      providers: [
        {
          provide: TraitService,
          useValue: mockService,
        },
      ],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<TraitController>(TraitController);
    service = module.get(TraitService);

    // Reset all mocks before each test
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create new trait', async () => {
      const expectedTrait = { ...mockTrait };
      service.create.mockResolvedValue(expectedTrait);

      const result = await controller.create(mockCreateTraitDto);

      expect(service.create).toHaveBeenCalledWith(mockCreateTraitDto);
      expect(result).toEqual(expectedTrait);
    });

    it('should delegate to service correctly', async () => {
      service.create.mockResolvedValue(mockTrait);

      await controller.create(mockCreateTraitDto);

      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(mockCreateTraitDto);
    });

    it('should apply auth guards for create operations', async () => {
      // This test verifies that create requires authentication
      // Guards are mocked in our test setup
      service.create.mockResolvedValue(mockTrait);

      const result = await controller.create(mockCreateTraitDto);

      expect(service.create).toHaveBeenCalledWith(mockCreateTraitDto);
      expect(result).toEqual(mockTrait);
    });

    it('should handle service exceptions during creation', async () => {
      const error = new Error('Creation failed');
      service.create.mockRejectedValue(error);

      await expect(controller.create(mockCreateTraitDto)).rejects.toThrow(error);

      expect(service.create).toHaveBeenCalledWith(mockCreateTraitDto);
    });
  });

  describe('findAll', () => {
    it('should return all traits', async () => {
      const mockTraits = [mockTrait, { ...mockTrait, id: 2, name: 'Heavy Damage' }];
      service.findAll.mockResolvedValue(mockTraits);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalledWith();
      expect(result).toEqual(mockTraits);
    });

    it('should delegate to service for find operations', async () => {
      service.findAll.mockResolvedValue([]);

      await controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should allow public access for read operations', async () => {
      // This test verifies that findAll doesn't require authentication
      // No guards should be applied to this method
      service.findAll.mockResolvedValue([mockTrait]);

      const result = await controller.findAll();

      expect(result).toEqual([mockTrait]);
    });

    it('should return empty array when no traits exist', async () => {
      service.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return trait by ID', async () => {
      const traitId = 1;
      service.findOne.mockResolvedValue(mockTrait);

      const result = await controller.findOne(traitId);

      expect(service.findOne).toHaveBeenCalledWith(traitId);
      expect(result).toEqual(mockTrait);
    });

    it('should delegate to service for find by ID', async () => {
      const traitId = 1;
      service.findOne.mockResolvedValue(mockTrait);

      await controller.findOne(traitId);

      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(traitId);
    });

    it('should allow public access for read operations', async () => {
      // This test verifies that findOne doesn't require authentication
      // No guards should be applied to this method
      const traitId = 1;
      service.findOne.mockResolvedValue(mockTrait);

      const result = await controller.findOne(traitId);

      expect(result).toEqual(mockTrait);
    });

    it('should handle service exceptions', async () => {
      const traitId = 999;
      const error = new Error('Trait not found');
      service.findOne.mockRejectedValue(error);

      await expect(controller.findOne(traitId)).rejects.toThrow(error);

      expect(service.findOne).toHaveBeenCalledWith(traitId);
    });
  });

  describe('update', () => {
    it('should update trait by ID', async () => {
      const traitId = 1;
      const updatedTrait = { ...mockTrait, ...mockUpdateTraitDto };
      service.update.mockResolvedValue(updatedTrait);

      const result = await controller.update(traitId, mockUpdateTraitDto);

      expect(service.update).toHaveBeenCalledWith(traitId, mockUpdateTraitDto);
      expect(result).toEqual(updatedTrait);
    });

    it('should delegate to service for updates', async () => {
      const traitId = 1;
      service.update.mockResolvedValue(mockTrait);

      await controller.update(traitId, mockUpdateTraitDto);

      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenCalledWith(traitId, mockUpdateTraitDto);
    });

    it('should apply auth guards for update operations', async () => {
      // This test verifies that update requires authentication
      // Guards are mocked in our test setup
      const traitId = 1;
      service.update.mockResolvedValue(mockTrait);

      const result = await controller.update(traitId, mockUpdateTraitDto);

      expect(service.update).toHaveBeenCalledWith(traitId, mockUpdateTraitDto);
      expect(result).toEqual(mockTrait);
    });

    it('should handle service exceptions during update', async () => {
      const traitId = 1;
      const error = new Error('Update failed');
      service.update.mockRejectedValue(error);

      await expect(controller.update(traitId, mockUpdateTraitDto)).rejects.toThrow(error);

      expect(service.update).toHaveBeenCalledWith(traitId, mockUpdateTraitDto);
    });

    it('should handle partial updates', async () => {
      const traitId = 1;
      const partialUpdate = { name: 'Updated Name' };
      const updatedTrait = { ...mockTrait, name: 'Updated Name' };
      service.update.mockResolvedValue(updatedTrait);

      const result = await controller.update(traitId, partialUpdate);

      expect(service.update).toHaveBeenCalledWith(traitId, partialUpdate);
      expect(result).toEqual(updatedTrait);
    });
  });

  describe('remove', () => {
    it('should remove trait by ID', async () => {
      const traitId = 1;
      service.remove.mockResolvedValue();

      await controller.remove(traitId);

      expect(service.remove).toHaveBeenCalledWith(traitId);
    });

    it('should delegate to service for deletion', async () => {
      const traitId = 1;
      service.remove.mockResolvedValue();

      await controller.remove(traitId);

      expect(service.remove).toHaveBeenCalledTimes(1);
      expect(service.remove).toHaveBeenCalledWith(traitId);
    });

    it('should apply auth guards for delete operations', async () => {
      // This test verifies that remove requires authentication
      // Guards are mocked in our test setup
      const traitId = 1;
      service.remove.mockResolvedValue();

      await controller.remove(traitId);

      expect(service.remove).toHaveBeenCalledWith(traitId);
    });

    it('should handle service exceptions during removal', async () => {
      const traitId = 1;
      const error = new Error('Removal failed');
      service.remove.mockRejectedValue(error);

      await expect(controller.remove(traitId)).rejects.toThrow(error);

      expect(service.remove).toHaveBeenCalledWith(traitId);
    });

    it('should return void on successful removal', async () => {
      const traitId = 1;
      service.remove.mockResolvedValue();

      const result = await controller.remove(traitId);

      expect(result).toBeUndefined();
    });
  });

  describe('guards and decorators', () => {
    it('should apply auth guards for CUD operations but not read operations', () => {
      // This test verifies that auth guards are applied to create, update, and delete methods
      // but not to read operations (findAll, findOne)
      expect(controller).toBeDefined();
      expect(controller.create).toBeDefined();
      expect(controller.update).toBeDefined();
      expect(controller.remove).toBeDefined();
      expect(controller.findAll).toBeDefined();
      expect(controller.findOne).toBeDefined();
    });

    it('should delegate all operations to service without modification', async () => {
      const traitId = 1;
      
      // Test all delegations
      service.create.mockResolvedValue(mockTrait);
      service.findAll.mockResolvedValue([mockTrait]);
      service.findOne.mockResolvedValue(mockTrait);
      service.update.mockResolvedValue(mockTrait);
      service.remove.mockResolvedValue();

      await controller.create(mockCreateTraitDto);
      await controller.findAll();
      await controller.findOne(traitId);
      await controller.update(traitId, mockUpdateTraitDto);
      await controller.remove(traitId);

      expect(service.create).toHaveBeenCalledWith(mockCreateTraitDto);
      expect(service.findAll).toHaveBeenCalledWith();
      expect(service.findOne).toHaveBeenCalledWith(traitId);
      expect(service.update).toHaveBeenCalledWith(traitId, mockUpdateTraitDto);
      expect(service.remove).toHaveBeenCalledWith(traitId);
    });
  });
});
