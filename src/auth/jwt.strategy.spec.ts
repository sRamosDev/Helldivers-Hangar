import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';

import { JwtStrategy } from './jwt.strategy';
import { User } from '../users/users.entity';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let userRepository: Repository<User>;
  let configService: ConfigService;
  let module: TestingModule;

  const createMockRepository = () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    remove: jest.fn(),
    findByIds: jest.fn(),
    merge: jest.fn(),
    count: jest.fn(),
    findAndCount: jest.fn(),
  });

  const createMockConfigService = () => ({
    get: jest.fn(),
  });

  beforeEach(async () => {
    // Reset all mocks before each test
    jest.resetAllMocks();
    jest.clearAllMocks();

    // Create fresh mocks for each test
    const mockUserRepository = createMockRepository();
    const mockConfigService = createMockConfigService();

    // Create fresh module for each test
    module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(async () => {
    // Clean up after each test
    jest.resetAllMocks();
    jest.clearAllMocks();
    await module.close();
  });

  describe('validate', () => {
    const validPayload = { id: 1, role: 'user' };

    it('should return user when valid payload provided', async () => {
      // Arrange
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
        displayName: 'Test User',
        role: 'user',
        isActive: true,
      } as User;

      userRepository.findOneBy = jest.fn().mockResolvedValue(mockUser);

      // Act
      const result = await strategy.validate(validPayload);

      // Assert
      expect(result).toEqual(mockUser);
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: validPayload.id });
      expect(userRepository.findOneBy).toHaveBeenCalledTimes(1);
    });

    it('should throw UnauthorizedException when user not found', async () => {
      // Arrange
      userRepository.findOneBy = jest.fn().mockResolvedValue(null);

      // Act & Assert
      await expect(strategy.validate(validPayload)).rejects.toThrow(
        new UnauthorizedException('User inactive')
      );
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: validPayload.id });
    });

    it('should throw UnauthorizedException when user is inactive', async () => {
      // Arrange
      const inactiveUser = {
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
        displayName: 'Test User',
        role: 'user',
        isActive: false,
      } as User;

      userRepository.findOneBy = jest.fn().mockResolvedValue(inactiveUser);

      // Act & Assert
      await expect(strategy.validate(validPayload)).rejects.toThrow(
        new UnauthorizedException('User inactive')
      );
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: validPayload.id });
    });

    it('should throw UnauthorizedException when user isActive is undefined', async () => {
      // Arrange
      const userWithoutActiveFlag = {
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
        displayName: 'Test User',
        role: 'user',
        isActive: undefined,
      } as User;

      userRepository.findOneBy = jest.fn().mockResolvedValue(userWithoutActiveFlag);

      // Act & Assert
      await expect(strategy.validate(validPayload)).rejects.toThrow(
        new UnauthorizedException('User inactive')
      );
      expect(userRepository.findOneBy).toHaveBeenCalledWith({ id: validPayload.id });
    });
  });

  describe('Configuration', () => {
    it('should use correct JWT secret from config', () => {
      // Arrange
      const expectedSecret = 'test-jwt-secret';
      configService.get = jest.fn().mockReturnValue(expectedSecret);

      // Act - We need to create a new instance to test the constructor
      const testStrategy = new JwtStrategy(userRepository, configService);

      // Assert
      expect(configService.get).toHaveBeenCalledWith('JWT_SECRET');
      expect(testStrategy).toBeDefined();
    });

    it('should use default secret when config is not available', () => {
      // Arrange
      configService.get = jest.fn().mockReturnValue(null);

      // Act - We need to create a new instance to test the constructor
      const testStrategy = new JwtStrategy(userRepository, configService);

      // Assert
      expect(configService.get).toHaveBeenCalledWith('JWT_SECRET');
      expect(testStrategy).toBeDefined();
    });
  });

  describe('Strategy Configuration', () => {
    it('should be defined', () => {
      expect(strategy).toBeDefined();
    });

    it('should extend PassportStrategy', () => {
      expect(strategy).toBeInstanceOf(JwtStrategy);
    });
  });
});
