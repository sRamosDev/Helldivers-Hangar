import { Test, TestingModule } from '@nestjs/testing';
import { 
  HealthCheckService, 
  TypeOrmHealthIndicator
} from '@nestjs/terminus';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;
  let healthCheckService: jest.Mocked<HealthCheckService>;
  let typeOrmHealthIndicator: jest.Mocked<TypeOrmHealthIndicator>;

  beforeEach(async () => {
    const mockHealthCheckService = {
      check: jest.fn(),
    };

    const mockTypeOrmHealthIndicator = {
      pingCheck: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthCheckService,
          useValue: mockHealthCheckService,
        },
        {
          provide: TypeOrmHealthIndicator,
          useValue: mockTypeOrmHealthIndicator,
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    healthCheckService = module.get(HealthCheckService);
    typeOrmHealthIndicator = module.get(TypeOrmHealthIndicator);

    // Reset all mocks before each test
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('healthCheck', () => {
    it('should return status ok for basic health check', () => {
      const result = controller.healthCheck();

      expect(result).toEqual({ status: 'ok' });
    });

    it('should return consistent response format', () => {
      const result1 = controller.healthCheck();
      const result2 = controller.healthCheck();

      expect(result1).toEqual({ status: 'ok' });
      expect(result2).toEqual({ status: 'ok' });
      expect(result1).toEqual(result2);
    });

    it('should not call any external services for basic health check', () => {
      controller.healthCheck();

      expect(healthCheckService.check).not.toHaveBeenCalled();
      expect(typeOrmHealthIndicator.pingCheck).not.toHaveBeenCalled();
    });

    it('should return object with status property', () => {
      const result = controller.healthCheck();

      expect(result).toHaveProperty('status');
      expect(result.status).toBe('ok');
      expect(typeof result.status).toBe('string');
    });
  });

  describe('check', () => {
    it('should return database health status', async () => {
      const mockHealthResult = {
        status: 'ok',
        info: { database: { status: 'up' } },
        error: {},
        details: { database: { status: 'up' } },
      } as any;

      const mockPingResult = { database: { status: 'up' } } as any;
      typeOrmHealthIndicator.pingCheck.mockResolvedValue(mockPingResult);
      healthCheckService.check.mockResolvedValue(mockHealthResult);

      const result = await controller.check();

      expect(result).toEqual(mockHealthResult);
    });

    it('should call health check service with database ping check', async () => {
      const mockHealthResult = {
        status: 'ok',
        info: { database: { status: 'up' } },
        error: {},
        details: { database: { status: 'up' } },
      } as any;

      const mockPingResult = { database: { status: 'up' } } as any;
      typeOrmHealthIndicator.pingCheck.mockResolvedValue(mockPingResult);
      healthCheckService.check.mockResolvedValue(mockHealthResult);

      await controller.check();

      expect(healthCheckService.check).toHaveBeenCalledTimes(1);
      expect(healthCheckService.check).toHaveBeenCalledWith([expect.any(Function)]);
    });

    it('should call TypeORM health indicator with correct parameters', async () => {
      const mockHealthResult = {
        status: 'ok',
        info: { database: { status: 'up' } },
        error: {},
        details: { database: { status: 'up' } },
      } as any;

      const mockPingResult = { database: { status: 'up' } } as any;
      typeOrmHealthIndicator.pingCheck.mockResolvedValue(mockPingResult);
      healthCheckService.check.mockResolvedValue(mockHealthResult);

      await controller.check();

      // Verify that the function passed to healthCheckService.check calls pingCheck
      const checkFunction = healthCheckService.check.mock.calls[0][0][0];
      await checkFunction();

      expect(typeOrmHealthIndicator.pingCheck).toHaveBeenCalledWith('database');
    });

    it('should handle database connection failures', async () => {
      const mockHealthResult = {
        status: 'error',
        info: {},
        error: { database: { status: 'down', message: 'Connection failed' } },
        details: { database: { status: 'down', message: 'Connection failed' } },
      } as any;

      const databaseError = new Error('Database connection failed');
      typeOrmHealthIndicator.pingCheck.mockRejectedValue(databaseError);
      healthCheckService.check.mockResolvedValue(mockHealthResult);

      const result = await controller.check();

      expect(result).toEqual(mockHealthResult);
    });

    it('should propagate health check service errors', async () => {
      const healthCheckError = new Error('Health check service failed');
      typeOrmHealthIndicator.pingCheck.mockResolvedValue({ database: { status: 'up' } } as any);
      healthCheckService.check.mockRejectedValue(healthCheckError);

      await expect(controller.check()).rejects.toThrow(healthCheckError);

      expect(healthCheckService.check).toHaveBeenCalledTimes(1);
    });

    it('should handle successful database connection', async () => {
      const mockHealthResult = {
        status: 'ok',
        info: { database: { status: 'up', responseTime: 10 } },
        error: {},
        details: { database: { status: 'up', responseTime: 10 } },
      } as any;

      const mockPingResult = { database: { status: 'up', responseTime: 10 } } as any;
      typeOrmHealthIndicator.pingCheck.mockResolvedValue(mockPingResult);
      healthCheckService.check.mockResolvedValue(mockHealthResult);

      const result = await controller.check();

      expect(result.status).toBe('ok');
      expect(result.info).toHaveProperty('database');
      expect(result.details).toHaveProperty('database');
    });

    it('should handle partial database failures', async () => {
      const mockHealthResult = {
        status: 'error',
        info: {},
        error: { database: { status: 'down', message: 'Timeout' } },
        details: { database: { status: 'down', message: 'Timeout' } },
      } as any;

      const mockPingResult = { database: { status: 'down', message: 'Timeout' } } as any;
      typeOrmHealthIndicator.pingCheck.mockResolvedValue(mockPingResult);
      healthCheckService.check.mockResolvedValue(mockHealthResult);

      const result = await controller.check();

      expect(result.status).toBe('error');
      expect(result.error).toHaveProperty('database');
    });

    it('should verify the check function structure', async () => {
      const mockHealthResult = {
        status: 'ok',
        info: { database: { status: 'up' } },
        error: {},
        details: { database: { status: 'up' } },
      } as any;

      typeOrmHealthIndicator.pingCheck.mockResolvedValue({ database: { status: 'up' } } as any);
      healthCheckService.check.mockResolvedValue(mockHealthResult);

      await controller.check();

      // Verify that check was called with an array containing one async function
      expect(healthCheckService.check).toHaveBeenCalledWith([expect.any(Function)]);
      
      const checkFunctions = healthCheckService.check.mock.calls[0][0];
      expect(Array.isArray(checkFunctions)).toBe(true);
      expect(checkFunctions).toHaveLength(1);
      expect(typeof checkFunctions[0]).toBe('function');
    });
  });

  describe('controller structure', () => {
    it('should have all required methods defined', () => {
      expect(controller.healthCheck).toBeDefined();
      expect(controller.check).toBeDefined();
      expect(typeof controller.healthCheck).toBe('function');
      expect(typeof controller.check).toBe('function');
    });

    it('should have proper dependency injection', () => {
      expect(controller).toBeDefined();
      expect(healthCheckService).toBeDefined();
      expect(typeOrmHealthIndicator).toBeDefined();
    });
  });
});
