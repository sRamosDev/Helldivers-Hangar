import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { LoadoutsService } from './loadouts.service';
import { Loadout } from './loadout.entity';
import { CreateLoadoutDto } from './dto/createLoadout.dto';
import { UpdateLoadoutDto } from './dto/updateLoadout.dto';
import { User } from '../users/users.entity';

describe('LoadoutsService', () => {
  let service: LoadoutsService;
  let repository: jest.Mocked<Repository<Loadout>>;
  const mockUser: User = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    displayName: 'Test User',
    password: 'hashedpassword',
    role: 'user',
    isActive: true,
    permissions: [],
    refreshTokens: []
  };

  const mockLoadout: Partial<Loadout> = {
    id: 1,
    uniqueId: 'test-unique-id',
    name: 'Test Loadout',
    helmet: { id: 1 } as any,
    armor: { id: 2 } as any,
    cape: { id: 3 } as any,
    primary_weapon: { id: 4 } as any,
    secondary_weapon: { id: 5 } as any,
    throwable: { id: 6 } as any,
    created_at: new Date(),
    createdBy: mockUser
  };

  const mockCreateLoadoutDto: CreateLoadoutDto = {
    name: 'Test Loadout',
    helmetId: 1,
    armorId: 2,
    capeId: 3,
    primaryWeaponId: 4,
    secondaryWeaponId: 5,
    throwableId: 6,
    cfTurnstileToken: 'test-token'
  };

  const mockUpdateLoadoutDto: UpdateLoadoutDto = {
    helmetId: 10,
    armorId: 20,
    primaryWeaponId: 40
  };

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoadoutsService,
        {
          provide: getRepositoryToken(Loadout),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<LoadoutsService>(LoadoutsService);
    repository = module.get(getRepositoryToken(Loadout));

    // Reset all mocks before each test
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create loadout with generated unique ID', async () => {
      const expectedLoadout = { ...mockLoadout, uniqueId: expect.any(String) };
      repository.create.mockReturnValue(expectedLoadout as Loadout);
      repository.save.mockResolvedValue(expectedLoadout as Loadout);

      const result = await service.create(mockCreateLoadoutDto, mockUser);

      expect(repository.create).toHaveBeenCalledWith({
        name: mockCreateLoadoutDto.name,
        uniqueId: expect.any(String),
        helmet: { id: mockCreateLoadoutDto.helmetId },
        armor: { id: mockCreateLoadoutDto.armorId },
        cape: { id: mockCreateLoadoutDto.capeId },
        primary_weapon: { id: mockCreateLoadoutDto.primaryWeaponId },
        secondary_weapon: { id: mockCreateLoadoutDto.secondaryWeaponId },
        throwable: { id: mockCreateLoadoutDto.throwableId },
        createdBy: mockUser,
      });
      expect(repository.save).toHaveBeenCalledWith(expectedLoadout);
      expect(result).toEqual(expectedLoadout);
    });

    it('should associate loadout with user', async () => {
      const expectedLoadout = { ...mockLoadout };
      repository.create.mockReturnValue(expectedLoadout as Loadout);
      repository.save.mockResolvedValue(expectedLoadout as Loadout);

      await service.create(mockCreateLoadoutDto, mockUser);

      const createCall = repository.create.mock.calls[0][0];
      expect(createCall.createdBy).toBe(mockUser);
    });

    it('should create loadout with all relations', async () => {
      const expectedLoadout = { ...mockLoadout };
      repository.create.mockReturnValue(expectedLoadout as Loadout);
      repository.save.mockResolvedValue(expectedLoadout as Loadout);

      await service.create(mockCreateLoadoutDto, mockUser);

      const createCall = repository.create.mock.calls[0][0];
      expect(createCall.helmet).toEqual({ id: mockCreateLoadoutDto.helmetId });
      expect(createCall.armor).toEqual({ id: mockCreateLoadoutDto.armorId });
      expect(createCall.cape).toEqual({ id: mockCreateLoadoutDto.capeId });
      expect(createCall.primary_weapon).toEqual({ id: mockCreateLoadoutDto.primaryWeaponId });
      expect(createCall.secondary_weapon).toEqual({ id: mockCreateLoadoutDto.secondaryWeaponId });
      expect(createCall.throwable).toEqual({ id: mockCreateLoadoutDto.throwableId });
    });

    it('should generate unique base64 ID correctly', async () => {
      const expectedLoadout = { ...mockLoadout };
      repository.create.mockReturnValue(expectedLoadout as Loadout);
      repository.save.mockResolvedValue(expectedLoadout as Loadout);

      await service.create(mockCreateLoadoutDto, mockUser);

      const createCall = repository.create.mock.calls[0][0];
      const uniqueId = createCall.uniqueId;
      
      // Should be a string with URL-safe base64 characters
      expect(typeof uniqueId).toBe('string');
      expect(uniqueId.length).toBeGreaterThan(0);
      // Should not contain URL-unsafe characters
      expect(uniqueId).not.toMatch(/[/+]/);
    });
  });

  describe('findAll', () => {
    it('should return all loadouts', async () => {
      const mockLoadouts = [mockLoadout, { ...mockLoadout, id: 2, uniqueId: 'another-id' }];
      repository.find.mockResolvedValue(mockLoadouts as Loadout[]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith();
      expect(result).toEqual(mockLoadouts);
    });

    it('should return empty array when no loadouts exist', async () => {
      repository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return loadout by unique ID with relations', async () => {
      const uniqueId = 'test-unique-id';
      repository.findOne.mockResolvedValue(mockLoadout as Loadout);

      const result = await service.findOne(uniqueId);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { uniqueId },
        relations: [
          'helmet',
          'helmet.passive',
          'armor',
          'armor.passive',
          'cape',
          'cape.passive',
          'primary_weapon',
          'primary_weapon.traits',
          'secondary_weapon',
          'secondary_weapon.traits',
          'throwable',
        ],
      });
      expect(result).toEqual(mockLoadout);
    });

    it('should return null when loadout not found by unique ID', async () => {
      const uniqueId = 'non-existent-id';
      repository.findOne.mockResolvedValue(null);

      const result = await service.findOne(uniqueId);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { uniqueId },
        relations: [
          'helmet',
          'helmet.passive',
          'armor',
          'armor.passive',
          'cape',
          'cape.passive',
          'primary_weapon',
          'primary_weapon.traits',
          'secondary_weapon',
          'secondary_weapon.traits',
          'throwable',
        ],
      });
      expect(result).toBeNull();
    });
  });

  describe('findOneById', () => {
    it('should return loadout by numeric ID', async () => {
      const loadoutId = 1;
      repository.findOne.mockResolvedValue(mockLoadout as Loadout);

      const result = await service.findOneById(loadoutId);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: loadoutId } });
      expect(result).toEqual(mockLoadout);
    });

    it('should throw NotFoundException when loadout not found by ID', async () => {
      const loadoutId = 999;
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOneById(loadoutId)).rejects.toThrow(NotFoundException);
      await expect(service.findOneById(loadoutId)).rejects.toThrow('Loadout not found');

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: loadoutId } });
    });
  });

  describe('update', () => {
    it('should update loadout with partial data', async () => {
      const loadoutId = 1;
      const existingLoadout = { ...mockLoadout };
      const updatedLoadout = {
        ...existingLoadout,
        helmet: { id: mockUpdateLoadoutDto.helmetId },
        armor: { id: mockUpdateLoadoutDto.armorId },
        primary_weapon: { id: mockUpdateLoadoutDto.primaryWeaponId },
      };

      repository.findOne.mockResolvedValue(existingLoadout as Loadout);
      repository.save.mockResolvedValue(updatedLoadout as Loadout);

      const result = await service.update(loadoutId, mockUpdateLoadoutDto);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: loadoutId } });
      expect(repository.save).toHaveBeenCalledWith({
        ...existingLoadout,
        helmet: { id: mockUpdateLoadoutDto.helmetId },
        armor: { id: mockUpdateLoadoutDto.armorId },
        primary_weapon: { id: mockUpdateLoadoutDto.primaryWeaponId },
        // These should remain unchanged
        cape: existingLoadout.cape,
        secondary_weapon: existingLoadout.secondary_weapon,
        throwable: existingLoadout.throwable,
      });
      expect(result).toEqual(updatedLoadout);
    });

    it('should keep existing relations when not updated', async () => {
      const loadoutId = 1;
      const existingLoadout = { ...mockLoadout };
      const partialUpdate: UpdateLoadoutDto = { helmetId: 99 };

      repository.findOne.mockResolvedValue(existingLoadout as Loadout);
      repository.save.mockResolvedValue(existingLoadout as Loadout);

      await service.update(loadoutId, partialUpdate);

      const saveCall = repository.save.mock.calls[0][0];
      expect(saveCall.helmet).toEqual({ id: 99 });
      // These should remain unchanged from existing loadout
      expect(saveCall.armor).toBe(existingLoadout.armor);
      expect(saveCall.cape).toBe(existingLoadout.cape);
      expect(saveCall.primary_weapon).toBe(existingLoadout.primary_weapon);
      expect(saveCall.secondary_weapon).toBe(existingLoadout.secondary_weapon);
      expect(saveCall.throwable).toBe(existingLoadout.throwable);
    });

    it('should throw NotFoundException when updating non-existent loadout', async () => {
      const loadoutId = 999;
      repository.findOne.mockResolvedValue(null);

      await expect(service.update(loadoutId, mockUpdateLoadoutDto)).rejects.toThrow(NotFoundException);
      await expect(service.update(loadoutId, mockUpdateLoadoutDto)).rejects.toThrow('Loadout not found');

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: loadoutId } });
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove loadout by ID', async () => {
      const loadoutId = 1;
      repository.delete.mockResolvedValue({ affected: 1, raw: {} });

      await service.remove(loadoutId);

      expect(repository.delete).toHaveBeenCalledWith(loadoutId);
    });

    it('should not throw error when removing non-existent loadout', async () => {
      const loadoutId = 999;
      repository.delete.mockResolvedValue({ affected: 0, raw: {} });

      await expect(service.remove(loadoutId)).resolves.toBeUndefined();

      expect(repository.delete).toHaveBeenCalledWith(loadoutId);
    });
  });

  describe('generateUniqueId (private method)', () => {
    it('should generate unique base64 ID correctly', async () => {
      // Test through the public create method since generateUniqueId is private
      const expectedLoadout = { ...mockLoadout };
      repository.create.mockReturnValue(expectedLoadout as Loadout);
      repository.save.mockResolvedValue(expectedLoadout as Loadout);

      // Call create multiple times to test uniqueness
      await service.create(mockCreateLoadoutDto, mockUser);
      await service.create(mockCreateLoadoutDto, mockUser);
      await service.create(mockCreateLoadoutDto, mockUser);

      const calls = repository.create.mock.calls;
      const ids = calls.map(call => call[0].uniqueId);

      // All IDs should be different
      expect(new Set(ids).size).toBe(3);
      
      // Each ID should be URL-safe base64
      ids.forEach(id => {
        expect(typeof id).toBe('string');
        expect(id.length).toBeGreaterThan(0);
        expect(id).not.toMatch(/[/+]/); // Should not contain URL-unsafe characters
        expect(id).toMatch(/^[A-Za-z0-9_-]+=*$/); // Should only contain URL-safe base64 chars
      });
    });
  });
});
