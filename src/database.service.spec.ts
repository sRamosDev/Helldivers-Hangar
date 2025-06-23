import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { DatabaseService } from './database.service';

// Mock modules
jest.mock('fs');
jest.mock('path');
jest.mock('typeorm', () => ({
  DataSource: jest.fn().mockImplementation(() => ({
    query: jest.fn(),
  })),
}));

const mockFs = fs as jest.Mocked<typeof fs>;
const mockPath = path as jest.Mocked<typeof path>;

describe('DatabaseService', () => {
  let service: DatabaseService;
  let mockDataSource: any;
  let mockConfigService: any;
  let loggerSpy: jest.SpyInstance;

  const mockSqlContent = `
    INSERT INTO gear (name, description) VALUES ('Test Gear', 'Test Description');
    INSERT INTO weapon (name, damage) VALUES ('Test Weapon', 100);
  `;

  beforeEach(() => {
    // Create mocks
    mockDataSource = {
      query: jest.fn(),
    };

    mockConfigService = {
      get: jest.fn(),
    };

    // Create service instance directly
    service = new DatabaseService(mockDataSource, mockConfigService);

    // Mock Logger
    loggerSpy = jest.spyOn(Logger.prototype, 'log').mockImplementation();

    // Mock fs and path
    mockFs.readFileSync.mockReturnValue(mockSqlContent);
    mockPath.join.mockReturnValue('/mocked/path/populate-db.sql');

    // Reset all mocks
    jest.clearAllMocks();

    // Mock process.argv and process.cwd
    Object.defineProperty(process, 'argv', {
      value: ['node', 'script.js'],
      writable: true,
    });

    jest.spyOn(process, 'cwd').mockReturnValue('/mocked/cwd');

    // Spy on delay method to speed up tests
    jest.spyOn(service as any, 'delay').mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {    it('should check if database is populated on init', async () => {
      // Mock database as already populated
      mockDataSource.query.mockResolvedValue([{ count: '5' }]);

      await service.onModuleInit();

      expect(mockDataSource.query).toHaveBeenCalledWith('SELECT COUNT(*) FROM public.gear_has_passives');
      expect(loggerSpy).toHaveBeenCalledWith('DatabaseService has started');
      expect(loggerSpy).toHaveBeenCalledWith('Database is already populated');
    });

    it('should populate database when --populate flag is set', async () => {
      // Mock database as empty
      mockDataSource.query
        .mockResolvedValueOnce([{ count: '0' }]) // isDatabasePopulated
        .mockResolvedValueOnce([]); // populateDatabase query

      // Set command line argument
      process.argv = ['node', 'script.js', '--populate'];

      await service.onModuleInit();

      expect(mockDataSource.query).toHaveBeenCalledWith('SELECT COUNT(*) FROM public.gear_has_passives');
      expect(loggerSpy).toHaveBeenCalledWith('Populating database with demo data');
      expect(mockPath.join).toHaveBeenCalledWith('/mocked/cwd', 'populate-db.sql');
      expect(mockFs.readFileSync).toHaveBeenCalledWith('/mocked/path/populate-db.sql', 'utf8');
      expect(mockDataSource.query).toHaveBeenCalledWith(mockSqlContent);
    });

    it('should populate database when POPULATE_DB environment variable is true', async () => {
      // Mock database as empty
      mockDataSource.query
        .mockResolvedValueOnce([{ count: '0' }]) // isDatabasePopulated
        .mockResolvedValueOnce([]); // populateDatabase query

      mockConfigService.get.mockReturnValue('true');

      await service.onModuleInit();

      expect(mockConfigService.get).toHaveBeenCalledWith('POPULATE_DB');
      expect(loggerSpy).toHaveBeenCalledWith('Populating database with demo data');
      expect(mockDataSource.query).toHaveBeenCalledWith(mockSqlContent);
    });

    it('should populate database when POPULATE_DB environment variable is TRUE (case insensitive)', async () => {
      // Mock database as empty
      mockDataSource.query
        .mockResolvedValueOnce([{ count: '0' }]) // isDatabasePopulated
        .mockResolvedValueOnce([]); // populateDatabase query

      mockConfigService.get.mockReturnValue('TRUE');

      await service.onModuleInit();

      expect(mockConfigService.get).toHaveBeenCalledWith('POPULATE_DB');
      expect(loggerSpy).toHaveBeenCalledWith('Populating database with demo data');
    });

    it('should skip population when --no-populate flag is set', async () => {
      // Mock database as empty
      mockDataSource.query.mockResolvedValue([{ count: '0' }]);

      // Set command line argument
      process.argv = ['node', 'script.js', '--no-populate'];

      await service.onModuleInit();

      expect(mockDataSource.query).toHaveBeenCalledWith('SELECT COUNT(*) FROM public.gear_has_passives');
      expect(loggerSpy).toHaveBeenCalledWith('Skipping database population');
      expect(mockFs.readFileSync).not.toHaveBeenCalled();
    });

    it('should skip population when POPULATE_DB environment variable is false', async () => {
      // Mock database as empty
      mockDataSource.query.mockResolvedValue([{ count: '0' }]);

      mockConfigService.get.mockReturnValue('false');

      await service.onModuleInit();

      expect(mockConfigService.get).toHaveBeenCalledWith('POPULATE_DB');
      expect(loggerSpy).toHaveBeenCalledWith('Skipping database population');
      expect(mockFs.readFileSync).not.toHaveBeenCalled();
    });

    it('should log message when no population flag is set', async () => {
      // Mock database as empty
      mockDataSource.query.mockResolvedValue([{ count: '0' }]);

      mockConfigService.get.mockReturnValue(undefined);

      await service.onModuleInit();

      expect(loggerSpy).toHaveBeenCalledWith('No population flag set, please specify --populate or --no-populate');
      expect(mockFs.readFileSync).not.toHaveBeenCalled();
    });

    it('should handle --populate flag even when database is empty and no env var', async () => {
      // Mock database as empty
      mockDataSource.query
        .mockResolvedValueOnce([{ count: '0' }]) // isDatabasePopulated
        .mockResolvedValueOnce([]); // populateDatabase query

      mockConfigService.get.mockReturnValue(undefined);
      process.argv = ['node', 'script.js', '--populate'];

      await service.onModuleInit();

      expect(loggerSpy).toHaveBeenCalledWith('Populating database with demo data');
      expect(mockDataSource.query).toHaveBeenCalledWith(mockSqlContent);
    });

    it('should prioritize command line flags over environment variables', async () => {
      // Mock database as empty
      mockDataSource.query
        .mockResolvedValueOnce([{ count: '0' }]) // isDatabasePopulated
        .mockResolvedValueOnce([]); // populateDatabase query

      mockConfigService.get.mockReturnValue('false'); // ENV says false
      process.argv = ['node', 'script.js', '--populate']; // But CLI says populate

      await service.onModuleInit();

      expect(loggerSpy).toHaveBeenCalledWith('Populating database with demo data');
      expect(mockDataSource.query).toHaveBeenCalledWith(mockSqlContent);
    });    it('should handle delay properly', async () => {
      // Mock database as already populated
      mockDataSource.query.mockResolvedValue([{ count: '5' }]);

      // Restore the original delay method for this test
      (service as any).delay.mockRestore();
      const delaySpy = jest.spyOn(service as any, 'delay').mockResolvedValue(undefined);

      await service.onModuleInit();

      expect(delaySpy).toHaveBeenCalledWith(1000);
    });
  });
  describe('isDatabasePopulated (private method)', () => {
    it('should return true when database has data', async () => {
      mockDataSource.query.mockResolvedValue([{ count: '10' }]);

      const result = await (service as any).isDatabasePopulated();

      expect(result).toBe(true);
      expect(mockDataSource.query).toHaveBeenCalledWith('SELECT COUNT(*) FROM public.gear_has_passives');
    });

    it('should return false when database is empty', async () => {
      mockDataSource.query.mockResolvedValue([{ count: '0' }]);

      const result = await (service as any).isDatabasePopulated();

      expect(result).toBe(false);
      expect(mockDataSource.query).toHaveBeenCalledWith('SELECT COUNT(*) FROM public.gear_has_passives');
    });

    it('should return false when count is exactly 0', async () => {
      mockDataSource.query.mockResolvedValue([{ count: 0 }]); // number instead of string

      const result = await (service as any).isDatabasePopulated();

      expect(result).toBe(false);
    });

    it('should handle database query errors', async () => {
      const error = new Error('Database connection failed');
      mockDataSource.query.mockRejectedValue(error);

      await expect((service as any).isDatabasePopulated()).rejects.toThrow(error);
    });
  });
  describe('populateDatabase (private method)', () => {
    it('should execute SQL queries correctly', async () => {
      mockDataSource.query.mockResolvedValue([]);

      await (service as any).populateDatabase();

      expect(mockPath.join).toHaveBeenCalledWith(process.cwd(), 'populate-db.sql');
      expect(mockFs.readFileSync).toHaveBeenCalledWith('/mocked/path/populate-db.sql', 'utf8');
      expect(mockDataSource.query).toHaveBeenCalledWith(mockSqlContent);
    });

    it('should handle SQL file reading errors', async () => {
      const error = new Error('File not found');
      mockFs.readFileSync.mockImplementation(() => {
        throw error;
      });

      await expect((service as any).populateDatabase()).rejects.toThrow(error);
      expect(mockPath.join).toHaveBeenCalledWith(process.cwd(), 'populate-db.sql');
    });

    it('should handle SQL execution errors', async () => {
      const error = new Error('SQL syntax error');
      mockDataSource.query.mockRejectedValue(error);

      await expect((service as any).populateDatabase()).rejects.toThrow(error);
      expect(mockFs.readFileSync).toHaveBeenCalledWith('/mocked/path/populate-db.sql', 'utf8');
    });

    it('should use correct file path', async () => {
      process.cwd = jest.fn().mockReturnValue('/custom/working/directory');
      mockPath.join.mockReturnValue('/custom/working/directory/populate-db.sql');
      mockDataSource.query.mockResolvedValue([]);

      await (service as any).populateDatabase();

      expect(process.cwd).toHaveBeenCalled();
      expect(mockPath.join).toHaveBeenCalledWith('/custom/working/directory', 'populate-db.sql');
      expect(mockFs.readFileSync).toHaveBeenCalledWith('/custom/working/directory/populate-db.sql', 'utf8');
    });

    it('should handle empty SQL file', async () => {
      mockFs.readFileSync.mockReturnValue('');
      mockDataSource.query.mockResolvedValue([]);

      await (service as any).populateDatabase();

      expect(mockDataSource.query).toHaveBeenCalledWith('');
    });

    it('should handle SQL file with comments and whitespace', async () => {
      const sqlWithComments = `
        -- This is a comment
        INSERT INTO gear (name) VALUES ('Test');
        /* Multi-line comment */
        INSERT INTO weapon (name) VALUES ('Test Weapon');
      `;
      mockFs.readFileSync.mockReturnValue(sqlWithComments);
      mockDataSource.query.mockResolvedValue([]);

      await (service as any).populateDatabase();

      expect(mockDataSource.query).toHaveBeenCalledWith(sqlWithComments);
    });
  });

  describe('delay (private method)', () => {
    beforeEach(() => {
      // Restore the original delay method for these tests
      (service as any).delay.mockRestore();
    });

    it('should delay for specified milliseconds', async () => {
      const startTime = Date.now();
      
      await (service as any).delay(100);
      
      const endTime = Date.now();
      const elapsed = endTime - startTime;
      
      // Allow some tolerance for timer accuracy
      expect(elapsed).toBeGreaterThanOrEqual(90);
      expect(elapsed).toBeLessThan(150);
    });

    it('should delay for 0 milliseconds', async () => {
      const startTime = Date.now();
      
      await (service as any).delay(0);
      
      const endTime = Date.now();
      const elapsed = endTime - startTime;
      
      expect(elapsed).toBeLessThan(50); // Should be very quick
    });
  });
  describe('Integration scenarios', () => {
    it('should handle complete initialization flow when database is empty and populate is requested', async () => {
      // Setup
      mockDataSource.query
        .mockResolvedValueOnce([{ count: '0' }]) // isDatabasePopulated
        .mockResolvedValueOnce([]); // populateDatabase query

      process.argv = ['node', 'script.js', '--populate'];

      // Execute
      await service.onModuleInit();

      // Verify complete flow
      expect(loggerSpy).toHaveBeenCalledWith('DatabaseService has started');
      expect(mockDataSource.query).toHaveBeenCalledWith('SELECT COUNT(*) FROM public.gear_has_passives');
      expect(loggerSpy).toHaveBeenCalledWith('Populating database with demo data');
      expect(mockFs.readFileSync).toHaveBeenCalledWith('/mocked/path/populate-db.sql', 'utf8');
      expect(mockDataSource.query).toHaveBeenCalledWith(mockSqlContent);
    });

    it('should handle complete initialization flow when database is already populated', async () => {
      // Setup
      mockDataSource.query.mockResolvedValue([{ count: '5' }]); // Database has data

      // Execute
      await service.onModuleInit();

      // Verify complete flow
      expect(loggerSpy).toHaveBeenCalledWith('DatabaseService has started');
      expect(mockDataSource.query).toHaveBeenCalledWith('SELECT COUNT(*) FROM public.gear_has_passives');
      expect(loggerSpy).toHaveBeenCalledWith('Database is already populated');
      expect(mockFs.readFileSync).not.toHaveBeenCalled();
    });
  });
});
