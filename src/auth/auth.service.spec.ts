import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { AuthService } from './auth.service';
import { User } from '../users/users.entity';
import { RefreshToken } from './refresh-token.entity';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

// Mock bcrypt
jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;
  let refreshTokenRepository: Repository<RefreshToken>;
  let jwtService: JwtService;
  let activityLogService: ActivityLogService;
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

  const createMockJwtService = () => ({
    sign: jest.fn(),
    verify: jest.fn(),
  });

  const createMockActivityLogService = () => ({
    logAction: jest.fn(),
  });

  beforeEach(async () => {
    // Reset all mocks before each test
    jest.resetAllMocks();
    jest.clearAllMocks();

    // Create fresh mocks for each test
    const mockUserRepository = createMockRepository();
    const mockRefreshTokenRepository = createMockRepository();
    const mockJwtService = createMockJwtService();
    const mockActivityLogService = createMockActivityLogService();

    // Create fresh module for each test
    module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(RefreshToken),
          useValue: mockRefreshTokenRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ActivityLogService,
          useValue: mockActivityLogService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    refreshTokenRepository = module.get<Repository<RefreshToken>>(getRepositoryToken(RefreshToken));
    jwtService = module.get<JwtService>(JwtService);
    activityLogService = module.get<ActivityLogService>(ActivityLogService);
  });

  afterEach(async () => {
    // Clean up after each test
    jest.resetAllMocks();
    jest.clearAllMocks();
    await module.close();
  });

  describe('signUp', () => {    const validSignUpDto: SignUpDto = {
      displayName: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      password: 'TestPass123!',
      cfTurnstileToken: 'mock-turnstile-token',
    };

    it('should successfully register a new user', async () => {
      // Arrange
      const hashedPassword = 'hashedPassword123';
      const mockUser = { id: 1, ...validSignUpDto, password: hashedPassword, role: 'admin' };
      const mockToken = 'mockAccessToken';

      userRepository.findOne = jest.fn().mockResolvedValue(null);
      userRepository.count = jest.fn().mockResolvedValue(0);
      userRepository.create = jest.fn().mockReturnValue(mockUser);
      userRepository.save = jest.fn().mockResolvedValue(mockUser);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      jwtService.sign = jest.fn().mockReturnValue(mockToken);

      // Act
      const result = await service.signUp(validSignUpDto);

      // Assert
      expect(result).toEqual({ token: mockToken });
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: [{ email: validSignUpDto.email }, { username: validSignUpDto.username }],
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(validSignUpDto.password, 12);
      expect(userRepository.count).toHaveBeenCalled();
      expect(userRepository.create).toHaveBeenCalledWith({
        displayName: validSignUpDto.displayName,
        username: validSignUpDto.username,
        email: validSignUpDto.email,
        password: hashedPassword,
        role: 'admin',
      });
      expect(userRepository.save).toHaveBeenCalledWith(mockUser);
      expect(jwtService.sign).toHaveBeenCalledWith({ id: mockUser.id, role: mockUser.role });
    });

    it('should hash password correctly during registration', async () => {
      // Arrange
      const hashedPassword = 'hashedPassword123';
      const mockUser = { id: 1, ...validSignUpDto, password: hashedPassword, role: 'admin' };

      userRepository.findOne = jest.fn().mockResolvedValue(null);
      userRepository.count = jest.fn().mockResolvedValue(0);
      userRepository.create = jest.fn().mockReturnValue(mockUser);
      userRepository.save = jest.fn().mockResolvedValue(mockUser);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      jwtService.sign = jest.fn().mockReturnValue('token');

      // Act
      await service.signUp(validSignUpDto);

      // Assert
      expect(bcrypt.hash).toHaveBeenCalledWith(validSignUpDto.password, 12);
      expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    });

    it('should assign admin role to first user', async () => {
      // Arrange
      const hashedPassword = 'hashedPassword123';
      const mockUser = { id: 1, ...validSignUpDto, password: hashedPassword, role: 'admin' };

      userRepository.findOne = jest.fn().mockResolvedValue(null);
      userRepository.count = jest.fn().mockResolvedValue(0); // First user
      userRepository.create = jest.fn().mockReturnValue(mockUser);
      userRepository.save = jest.fn().mockResolvedValue(mockUser);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      jwtService.sign = jest.fn().mockReturnValue('token');

      // Act
      await service.signUp(validSignUpDto);

      // Assert
      expect(userRepository.create).toHaveBeenCalledWith({
        displayName: validSignUpDto.displayName,
        username: validSignUpDto.username,
        email: validSignUpDto.email,
        password: hashedPassword,
        role: 'admin',
      });
    });

    it('should assign user role to subsequent users', async () => {
      // Arrange
      const hashedPassword = 'hashedPassword123';
      const mockUser = { id: 2, ...validSignUpDto, password: hashedPassword, role: 'user' };

      userRepository.findOne = jest.fn().mockResolvedValue(null);
      userRepository.count = jest.fn().mockResolvedValue(1); // Not first user
      userRepository.create = jest.fn().mockReturnValue(mockUser);
      userRepository.save = jest.fn().mockResolvedValue(mockUser);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      jwtService.sign = jest.fn().mockReturnValue('token');

      // Act
      await service.signUp(validSignUpDto);

      // Assert
      expect(userRepository.create).toHaveBeenCalledWith({
        displayName: validSignUpDto.displayName,
        username: validSignUpDto.username,
        email: validSignUpDto.email,
        password: hashedPassword,
        role: 'user',
      });
    });

    it('should throw ConflictException when email already exists', async () => {
      // Arrange
      const existingUser = { id: 1, email: validSignUpDto.email };
      userRepository.findOne = jest.fn().mockResolvedValue(existingUser);

      // Act & Assert
      await expect(service.signUp(validSignUpDto)).rejects.toThrow(
        new ConflictException('Email or username already exists')
      );
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: [{ email: validSignUpDto.email }, { username: validSignUpDto.username }],
      });
    });

    it('should throw ConflictException when username already exists', async () => {
      // Arrange
      const existingUser = { id: 1, username: validSignUpDto.username };
      userRepository.findOne = jest.fn().mockResolvedValue(existingUser);

      // Act & Assert
      await expect(service.signUp(validSignUpDto)).rejects.toThrow(
        new ConflictException('Email or username already exists')
      );
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: [{ email: validSignUpDto.email }, { username: validSignUpDto.username }],
      });
    });

    it('should throw BadRequestException when password > 72 characters', async () => {
      // Arrange
      const longPasswordDto = {
        ...validSignUpDto,
        password: 'a'.repeat(73), // 73 characters
      };
      userRepository.findOne = jest.fn().mockResolvedValue(null);

      // Act & Assert
      await expect(service.signUp(longPasswordDto)).rejects.toThrow(
        new BadRequestException('Password must be less than 72 characters')
      );
      expect(userRepository.findOne).toHaveBeenCalled();
    });
  });

  describe('login', () => {    const validLoginDto: LoginDto = {
      usernameOrEmail: 'test@example.com',
      password: 'TestPass123!',
      cfTurnstileToken: 'mock-turnstile-token',
    };

    const mockUser = {
      id: 1,
      email: 'test@example.com',
      username: 'testuser',
      password: 'hashedPassword',
      role: 'user',
    };

    it('should successfully login with valid credentials (email)', async () => {
      // Arrange
      const mockToken = 'mockAccessToken';
      userRepository.findOne = jest.fn().mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jwtService.sign = jest.fn().mockReturnValue(mockToken);

      // Act
      const result = await service.login(validLoginDto);

      // Assert
      expect(result).toEqual({ token: mockToken });
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: [
          { email: validLoginDto.usernameOrEmail },
          { username: validLoginDto.usernameOrEmail },
        ],
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(validLoginDto.password, mockUser.password);
      expect(jwtService.sign).toHaveBeenCalledWith({ id: mockUser.id, role: mockUser.role });
    });

    it('should successfully login with valid credentials (username)', async () => {
      // Arrange
      const usernameLoginDto = { ...validLoginDto, usernameOrEmail: 'testuser' };
      const mockToken = 'mockAccessToken';
      userRepository.findOne = jest.fn().mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jwtService.sign = jest.fn().mockReturnValue(mockToken);

      // Act
      const result = await service.login(usernameLoginDto);

      // Assert
      expect(result).toEqual({ token: mockToken });
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: [
          { email: usernameLoginDto.usernameOrEmail },
          { username: usernameLoginDto.usernameOrEmail },
        ],
      });
    });

    it('should throw UnauthorizedException with invalid credentials', async () => {
      // Arrange
      userRepository.findOne = jest.fn().mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      // Act & Assert
      await expect(service.login(validLoginDto)).rejects.toThrow(
        new UnauthorizedException('Invalid credentials')
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(validLoginDto.password, mockUser.password);
    });

    it('should throw UnauthorizedException when user not found', async () => {
      // Arrange
      userRepository.findOne = jest.fn().mockResolvedValue(null);

      // Act & Assert
      await expect(service.login(validLoginDto)).rejects.toThrow(
        new UnauthorizedException('Invalid credentials')
      );
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: [
          { email: validLoginDto.usernameOrEmail },
          { username: validLoginDto.usernameOrEmail },
        ],
      });
    });

    it('should throw BadRequestException when login password > 72 characters', async () => {
      // Arrange
      const longPasswordDto = {
        ...validLoginDto,
        password: 'a'.repeat(73), // 73 characters
      };
      userRepository.findOne = jest.fn().mockResolvedValue(mockUser);

      // Act & Assert
      await expect(service.login(longPasswordDto)).rejects.toThrow(
        new BadRequestException('Password must be less than 72 characters')
      );
    });
  });

  describe('createAccessToken', () => {
    it('should create access token with correct payload', async () => {
      // Arrange
      const mockUser = { id: 1, role: 'user' } as User;
      const mockToken = 'mockAccessToken';
      jwtService.sign = jest.fn().mockReturnValue(mockToken);

      // Act
      const result = await service.createAccessToken(mockUser);

      // Assert
      expect(result).toBe(mockToken);
      expect(jwtService.sign).toHaveBeenCalledWith(
        { sub: mockUser.id },
        { expiresIn: '15m' }
      );
    });
  });

  describe('createRefreshToken', () => {
    it('should create refresh token and save to database', async () => {
      // Arrange
      const mockUser = { id: 1, role: 'user' } as User;
      const mockToken = 'mockRefreshToken';
      const mockRefreshToken = {
        token: mockToken,
        user: mockUser,
        expiresAt: expect.any(Date),
      };

      jwtService.sign = jest.fn().mockReturnValue(mockToken);
      refreshTokenRepository.create = jest.fn().mockReturnValue(mockRefreshToken);
      refreshTokenRepository.save = jest.fn().mockResolvedValue(mockRefreshToken);

      // Mock Date.now to have predictable expiration time
      const mockNow = 1640995200000; // 2022-01-01
      jest.spyOn(Date, 'now').mockReturnValue(mockNow);

      // Act
      const result = await service.createRefreshToken(mockUser);

      // Assert
      expect(result).toBe(mockToken);
      expect(jwtService.sign).toHaveBeenCalledWith(
        { sub: mockUser.id },
        { expiresIn: '7d' }
      );
      expect(refreshTokenRepository.create).toHaveBeenCalledWith({
        token: mockToken,
        user: mockUser,
        expiresAt: new Date(mockNow + 7 * 24 * 60 * 60 * 1000),
      });
      expect(refreshTokenRepository.save).toHaveBeenCalledWith(mockRefreshToken);

      // Restore Date.now
      jest.restoreAllMocks();
    });

    it('should set correct expiration times for tokens', async () => {
      // Arrange
      const mockUser = { id: 1, role: 'user' } as User;
      const mockToken = 'mockRefreshToken';
      const mockNow = 1640995200000; // 2022-01-01
      const expectedExpirationTime = new Date(mockNow + 7 * 24 * 60 * 60 * 1000);

      jwtService.sign = jest.fn().mockReturnValue(mockToken);
      refreshTokenRepository.create = jest.fn().mockReturnValue({});
      refreshTokenRepository.save = jest.fn().mockResolvedValue({});

      jest.spyOn(Date, 'now').mockReturnValue(mockNow);

      // Act
      await service.createRefreshToken(mockUser);

      // Assert
      expect(refreshTokenRepository.create).toHaveBeenCalledWith({
        token: mockToken,
        user: mockUser,
        expiresAt: expectedExpirationTime,
      });

      // Restore Date.now
      jest.restoreAllMocks();
    });
  });
});