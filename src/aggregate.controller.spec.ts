import { Test, TestingModule } from '@nestjs/testing';
import { AggregateController } from './aggregate.controller';
import { WeaponService } from './weapon/weapon.service';
import { ThrowableService } from './throwable/throwable.service';
import { GearService } from './gear/gear.service';
import { FiringModeService } from './firingMode/firingMode.service';
import { TraitService } from './trait/trait.service';
import { PassiveService } from './passive/passive.service';

describe('AggregateController', () => {
  let controller: AggregateController;
  let weaponService: jest.Mocked<WeaponService>;
  let throwableService: jest.Mocked<ThrowableService>;
  let gearService: jest.Mocked<GearService>;
  let firingModeService: jest.Mocked<FiringModeService>;
  let traitService: jest.Mocked<TraitService>;
  let passiveService: jest.Mocked<PassiveService>;

  const mockWeapons = [
    { id: 1, name: 'Test Weapon 1', description: 'Test weapon description' },
    { id: 2, name: 'Test Weapon 2', description: 'Another test weapon' },
  ];

  const mockThrowables = [
    { id: 1, name: 'Test Throwable 1', description: 'Test throwable description' },
    { id: 2, name: 'Test Throwable 2', description: 'Another test throwable' },
  ];

  const mockGear = [
    { id: 1, name: 'Test Gear 1', description: 'Test gear description' },
    { id: 2, name: 'Test Gear 2', description: 'Another test gear' },
  ];

  const mockFiringModes = [
    { id: 1, name: 'Full Auto', description: 'Fully automatic firing mode' },
    { id: 2, name: 'Semi Auto', description: 'Semi-automatic firing mode' },
  ];

  const mockTraits = [
    { id: 1, name: 'Test Trait 1', description: 'Test trait description' },
    { id: 2, name: 'Test Trait 2', description: 'Another test trait' },
  ];

  const mockPassives = [
    { id: 1, name: 'Test Passive 1', description: 'Test passive description' },
    { id: 2, name: 'Test Passive 2', description: 'Another test passive' },
  ];

  beforeEach(async () => {
    const mockWeaponService = {
      findAll: jest.fn(),
    };

    const mockThrowableService = {
      findAll: jest.fn(),
    };

    const mockGearService = {
      findAll: jest.fn(),
    };

    const mockFiringModeService = {
      findAll: jest.fn(),
    };

    const mockTraitService = {
      findAll: jest.fn(),
    };

    const mockPassiveService = {
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AggregateController],
      providers: [
        {
          provide: WeaponService,
          useValue: mockWeaponService,
        },
        {
          provide: ThrowableService,
          useValue: mockThrowableService,
        },
        {
          provide: GearService,
          useValue: mockGearService,
        },
        {
          provide: FiringModeService,
          useValue: mockFiringModeService,
        },
        {
          provide: TraitService,
          useValue: mockTraitService,
        },
        {
          provide: PassiveService,
          useValue: mockPassiveService,
        },
      ],
    }).compile();

    controller = module.get<AggregateController>(AggregateController);
    weaponService = module.get(WeaponService);
    throwableService = module.get(ThrowableService);
    gearService = module.get(GearService);
    firingModeService = module.get(FiringModeService);
    traitService = module.get(TraitService);
    passiveService = module.get(PassiveService);

    // Reset all mocks before each test
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllData', () => {
    beforeEach(() => {
      // Setup default mock returns
      weaponService.findAll.mockResolvedValue(mockWeapons as any);
      throwableService.findAll.mockResolvedValue(mockThrowables as any);
      gearService.findAll.mockResolvedValue(mockGear as any);
      firingModeService.findAll.mockResolvedValue(mockFiringModes as any);
      traitService.findAll.mockResolvedValue(mockTraits as any);
      passiveService.findAll.mockResolvedValue(mockPassives as any);
    });

    it('should return aggregated data from all services', async () => {
      const result = await controller.getAllData();

      expect(result).toEqual({
        weapons: mockWeapons,
        throwables: mockThrowables,
        gear: mockGear,
        firingModes: mockFiringModes,
        traits: mockTraits,
        passives: mockPassives,
      });
    });

    it('should call findAll on all services exactly once', async () => {
      await controller.getAllData();

      expect(weaponService.findAll).toHaveBeenCalledTimes(1);
      expect(throwableService.findAll).toHaveBeenCalledTimes(1);
      expect(gearService.findAll).toHaveBeenCalledTimes(1);
      expect(firingModeService.findAll).toHaveBeenCalledTimes(1);
      expect(traitService.findAll).toHaveBeenCalledTimes(1);
      expect(passiveService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should call findAll on all services with no parameters', async () => {
      await controller.getAllData();

      expect(weaponService.findAll).toHaveBeenCalledWith();
      expect(throwableService.findAll).toHaveBeenCalledWith();
      expect(gearService.findAll).toHaveBeenCalledWith();
      expect(firingModeService.findAll).toHaveBeenCalledWith();
      expect(traitService.findAll).toHaveBeenCalledWith();
      expect(passiveService.findAll).toHaveBeenCalledWith();
    });

    it('should return proper response structure with all required fields', async () => {
      const result = await controller.getAllData();

      expect(result).toHaveProperty('weapons');
      expect(result).toHaveProperty('throwables');
      expect(result).toHaveProperty('gear');
      expect(result).toHaveProperty('firingModes');
      expect(result).toHaveProperty('traits');
      expect(result).toHaveProperty('passives');

      expect(Array.isArray(result.weapons)).toBe(true);
      expect(Array.isArray(result.throwables)).toBe(true);
      expect(Array.isArray(result.gear)).toBe(true);
      expect(Array.isArray(result.firingModes)).toBe(true);
      expect(Array.isArray(result.traits)).toBe(true);
      expect(Array.isArray(result.passives)).toBe(true);
    });

    it('should handle empty arrays from services', async () => {
      weaponService.findAll.mockResolvedValue([]);
      throwableService.findAll.mockResolvedValue([]);
      gearService.findAll.mockResolvedValue([]);
      firingModeService.findAll.mockResolvedValue([]);
      traitService.findAll.mockResolvedValue([]);
      passiveService.findAll.mockResolvedValue([]);

      const result = await controller.getAllData();

      expect(result).toEqual({
        weapons: [],
        throwables: [],
        gear: [],
        firingModes: [],
        traits: [],
        passives: [],
      });
    });

    it('should handle services returning different sized arrays', async () => {
      weaponService.findAll.mockResolvedValue([mockWeapons[0]] as any);
      throwableService.findAll.mockResolvedValue([]);
      gearService.findAll.mockResolvedValue(mockGear as any);
      firingModeService.findAll.mockResolvedValue([mockFiringModes[0]] as any);
      traitService.findAll.mockResolvedValue([]);
      passiveService.findAll.mockResolvedValue(mockPassives as any);

      const result = await controller.getAllData();

      expect(result.weapons).toHaveLength(1);
      expect(result.throwables).toHaveLength(0);
      expect(result.gear).toHaveLength(2);
      expect(result.firingModes).toHaveLength(1);
      expect(result.traits).toHaveLength(0);
      expect(result.passives).toHaveLength(2);
    });

    it('should propagate errors from weapon service', async () => {
      const error = new Error('Weapon service failed');
      weaponService.findAll.mockRejectedValue(error);

      await expect(controller.getAllData()).rejects.toThrow(error);
    });

    it('should propagate errors from throwable service', async () => {
      const error = new Error('Throwable service failed');
      throwableService.findAll.mockRejectedValue(error);

      await expect(controller.getAllData()).rejects.toThrow(error);
    });

    it('should propagate errors from gear service', async () => {
      const error = new Error('Gear service failed');
      gearService.findAll.mockRejectedValue(error);

      await expect(controller.getAllData()).rejects.toThrow(error);
    });

    it('should propagate errors from firing mode service', async () => {
      const error = new Error('Firing mode service failed');
      firingModeService.findAll.mockRejectedValue(error);

      await expect(controller.getAllData()).rejects.toThrow(error);
    });

    it('should propagate errors from trait service', async () => {
      const error = new Error('Trait service failed');
      traitService.findAll.mockRejectedValue(error);

      await expect(controller.getAllData()).rejects.toThrow(error);
    });

    it('should propagate errors from passive service', async () => {
      const error = new Error('Passive service failed');
      passiveService.findAll.mockRejectedValue(error);

      await expect(controller.getAllData()).rejects.toThrow(error);
    });

    it('should execute service calls sequentially as per implementation', async () => {
      let callOrder: string[] = [];

      weaponService.findAll.mockImplementation(async () => {
        callOrder.push('weapons');
        return mockWeapons as any;
      });

      throwableService.findAll.mockImplementation(async () => {
        callOrder.push('throwables');
        return mockThrowables as any;
      });

      gearService.findAll.mockImplementation(async () => {
        callOrder.push('gear');
        return mockGear as any;
      });

      firingModeService.findAll.mockImplementation(async () => {
        callOrder.push('firingModes');
        return mockFiringModes as any;
      });

      traitService.findAll.mockImplementation(async () => {
        callOrder.push('traits');
        return mockTraits as any;
      });

      passiveService.findAll.mockImplementation(async () => {
        callOrder.push('passives');
        return mockPassives as any;
      });

      await controller.getAllData();

      expect(callOrder).toEqual(['weapons', 'throwables', 'gear', 'firingModes', 'traits', 'passives']);
    });

    it('should return data with correct structure even with null values', async () => {
      weaponService.findAll.mockResolvedValue(null as any);
      throwableService.findAll.mockResolvedValue(undefined as any);
      gearService.findAll.mockResolvedValue(mockGear as any);
      firingModeService.findAll.mockResolvedValue(mockFiringModes as any);
      traitService.findAll.mockResolvedValue(mockTraits as any);
      passiveService.findAll.mockResolvedValue(mockPassives as any);

      const result = await controller.getAllData();

      expect(result).toHaveProperty('weapons', null);
      expect(result).toHaveProperty('throwables', undefined);
      expect(result).toHaveProperty('gear', mockGear);
      expect(result).toHaveProperty('firingModes', mockFiringModes);
      expect(result).toHaveProperty('traits', mockTraits);
      expect(result).toHaveProperty('passives', mockPassives);
    });
  });

  describe('controller structure', () => {
    it('should have getAllData method defined', () => {
      expect(controller.getAllData).toBeDefined();
      expect(typeof controller.getAllData).toBe('function');
    });

    it('should have proper dependency injection', () => {
      expect(controller).toBeDefined();
      expect(weaponService).toBeDefined();
      expect(throwableService).toBeDefined();
      expect(gearService).toBeDefined();
      expect(firingModeService).toBeDefined();
      expect(traitService).toBeDefined();
      expect(passiveService).toBeDefined();
    });

    it('should inject all required services', () => {
      expect(weaponService).toHaveProperty('findAll');
      expect(throwableService).toHaveProperty('findAll');
      expect(gearService).toHaveProperty('findAll');
      expect(firingModeService).toHaveProperty('findAll');
      expect(traitService).toHaveProperty('findAll');
      expect(passiveService).toHaveProperty('findAll');
    });
  });
});
