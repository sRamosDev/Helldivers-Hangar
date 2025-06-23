import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLogService } from './activity-log.service';
import { ActivityLog } from './activity-log.entity';

describe('ActivityLogService', () => {
  let service: ActivityLogService;
  let repository: jest.Mocked<Repository<ActivityLog>>;

  const mockActivityLog: ActivityLog = {
    id: 1,
    userId: 123,
    action: 'User logged in',
    timestamp: new Date('2024-01-01T10:00:00Z')
  };

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityLogService,
        {
          provide: getRepositoryToken(ActivityLog),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ActivityLogService>(ActivityLogService);
    repository = module.get(getRepositoryToken(ActivityLog));

    // Reset all mocks before each test
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('logAction', () => {
    it('should create and save activity log entry', async () => {
      const userId = 123;
      const action = 'User logged in';
      const expectedLogData = { userId, action };
      const createdLog = { ...mockActivityLog, userId, action };

      repository.create.mockReturnValue(createdLog);
      repository.save.mockResolvedValue(createdLog);

      await service.logAction(userId, action);

      expect(repository.create).toHaveBeenCalledWith(expectedLogData);
      expect(repository.save).toHaveBeenCalledWith(createdLog);
    });

    it('should handle repository operations correctly', async () => {
      const userId = 456;
      const action = 'User updated profile';
      const createdLog = { ...mockActivityLog, userId, action };

      repository.create.mockReturnValue(createdLog);
      repository.save.mockResolvedValue(createdLog);

      await service.logAction(userId, action);

      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('should create log entry with correct data structure', async () => {
      const userId = 789;
      const action = 'User deleted item';
      const expectedLogData = { userId, action };
      const createdLog = { ...mockActivityLog, userId, action };

      repository.create.mockReturnValue(createdLog);
      repository.save.mockResolvedValue(createdLog);

      await service.logAction(userId, action);

      expect(repository.create).toHaveBeenCalledWith(expectedLogData);
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: expect.any(Number),
          action: expect.any(String),
        })
      );
    });

    it('should handle different user IDs and actions', async () => {
      const testCases = [
        { userId: 1, action: 'Login' },
        { userId: 999, action: 'Logout' },
        { userId: 42, action: 'Created loadout' },
        { userId: 0, action: 'Empty action test' },
      ];

      for (const testCase of testCases) {
        const createdLog = { ...mockActivityLog, ...testCase };
        repository.create.mockReturnValue(createdLog);
        repository.save.mockResolvedValue(createdLog);

        await service.logAction(testCase.userId, testCase.action);

        expect(repository.create).toHaveBeenCalledWith({
          userId: testCase.userId,
          action: testCase.action,
        });
      }

      expect(repository.create).toHaveBeenCalledTimes(testCases.length);
      expect(repository.save).toHaveBeenCalledTimes(testCases.length);
    });

    it('should handle database errors gracefully', async () => {
      const userId = 123;
      const action = 'User action';
      const createdLog = { ...mockActivityLog, userId, action };
      const dbError = new Error('Database connection failed');

      repository.create.mockReturnValue(createdLog);
      repository.save.mockRejectedValue(dbError);

      await expect(service.logAction(userId, action)).rejects.toThrow(dbError);

      expect(repository.create).toHaveBeenCalledWith({ userId, action });
      expect(repository.save).toHaveBeenCalledWith(createdLog);
    });

    it('should propagate repository create errors', async () => {
      const userId = 123;
      const action = 'User action';
      const createError = new Error('Entity creation failed');

      repository.create.mockImplementation(() => {
        throw createError;
      });

      await expect(service.logAction(userId, action)).rejects.toThrow(createError);

      expect(repository.create).toHaveBeenCalledWith({ userId, action });
      expect(repository.save).not.toHaveBeenCalled();
    });

    it('should handle repository save errors', async () => {
      const userId = 123;
      const action = 'User action';
      const createdLog = { ...mockActivityLog, userId, action };
      const saveError = new Error('Save operation failed');

      repository.create.mockReturnValue(createdLog);
      repository.save.mockRejectedValue(saveError);

      await expect(service.logAction(userId, action)).rejects.toThrow(saveError);

      expect(repository.create).toHaveBeenCalledWith({ userId, action });
      expect(repository.save).toHaveBeenCalledWith(createdLog);
    });

    it('should return void on successful operation', async () => {
      const userId = 123;
      const action = 'User action';
      const createdLog = { ...mockActivityLog, userId, action };

      repository.create.mockReturnValue(createdLog);
      repository.save.mockResolvedValue(createdLog);

      const result = await service.logAction(userId, action);

      expect(result).toBeUndefined();
    });

    it('should accept edge case values', async () => {
      const testCases = [
        { userId: 0, action: '' },
        { userId: -1, action: 'Negative user ID test' },
        { userId: Number.MAX_SAFE_INTEGER, action: 'Max user ID test' },
        { userId: 123, action: ' '.repeat(1000) }, // Very long action
      ];

      for (const testCase of testCases) {
        const createdLog = { ...mockActivityLog, ...testCase };
        repository.create.mockReturnValue(createdLog);
        repository.save.mockResolvedValue(createdLog);

        await service.logAction(testCase.userId, testCase.action);

        expect(repository.create).toHaveBeenCalledWith({
          userId: testCase.userId,
          action: testCase.action,
        });
      }
    });
  });
});
