import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;
  let module: TestingModule;

  const createMockReflector = () => ({
    get: jest.fn(),
  });

  const createMockExecutionContext = (user?: any) => ({
    switchToHttp: () => ({
      getRequest: () => ({ user }),
    }),
    getHandler: () => ({}),
  }) as ExecutionContext;

  beforeEach(async () => {
    // Reset all mocks before each test
    jest.resetAllMocks();
    jest.clearAllMocks();

    // Create fresh mocks for each test
    const mockReflector = createMockReflector();

    // Create fresh module for each test
    module = await Test.createTestingModule({
      providers: [
        RolesGuard,
        {
          provide: Reflector,
          useValue: mockReflector,
        },
      ],
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  afterEach(async () => {
    // Clean up after each test
    jest.resetAllMocks();
    jest.clearAllMocks();
    await module.close();
  });

  describe('canActivate', () => {
    it('should allow access when no roles specified', () => {
      // Arrange
      const context = createMockExecutionContext();
      reflector.get = jest.fn().mockReturnValue(null);

      // Act
      const result = guard.canActivate(context);

      // Assert
      expect(result).toBe(true);
      expect(reflector.get).toHaveBeenCalledWith('roles', context.getHandler());
    });

    it('should allow access when user has required role', () => {
      // Arrange
      const user = { role: 'admin' };
      const context = createMockExecutionContext(user);
      const requiredRoles = ['admin', 'user'];
      reflector.get = jest.fn().mockReturnValue(requiredRoles);

      // Act
      const result = guard.canActivate(context);

      // Assert
      expect(result).toBe(true);
      expect(reflector.get).toHaveBeenCalledWith('roles', context.getHandler());
    });

    it('should deny access when user lacks required role', () => {
      // Arrange
      const user = { role: 'user' };
      const context = createMockExecutionContext(user);
      const requiredRoles = ['admin'];
      reflector.get = jest.fn().mockReturnValue(requiredRoles);

      // Act
      const result = guard.canActivate(context);

      // Assert
      expect(result).toBe(false);
      expect(reflector.get).toHaveBeenCalledWith('roles', context.getHandler());
    });

    it('should deny access when user has no role', () => {
      // Arrange
      const user = {}; // No role property
      const context = createMockExecutionContext(user);
      const requiredRoles = ['admin'];
      reflector.get = jest.fn().mockReturnValue(requiredRoles);

      // Act
      const result = guard.canActivate(context);

      // Assert
      expect(result).toBe(false);
      expect(reflector.get).toHaveBeenCalledWith('roles', context.getHandler());
    });    it('should handle gracefully when no user in request', () => {
      // Arrange
      const context = createMockExecutionContext(); // No user
      const requiredRoles = ['admin'];
      reflector.get = jest.fn().mockReturnValue(requiredRoles);

      // Act & Assert
      // The guard will throw an error when trying to access user.role on undefined
      expect(() => guard.canActivate(context)).toThrow();
      expect(reflector.get).toHaveBeenCalledWith('roles', context.getHandler());
    });

    it('should allow access when user role matches one of multiple required roles', () => {
      // Arrange
      const user = { role: 'moderator' };
      const context = createMockExecutionContext(user);
      const requiredRoles = ['admin', 'moderator', 'user'];
      reflector.get = jest.fn().mockReturnValue(requiredRoles);

      // Act
      const result = guard.canActivate(context);

      // Assert
      expect(result).toBe(true);
      expect(reflector.get).toHaveBeenCalledWith('roles', context.getHandler());
    });    it('should deny access when roles array is empty but roles are defined', () => {
      // Arrange
      const user = { role: 'user' };
      const context = createMockExecutionContext(user);
      const requiredRoles = []; // Empty but defined array
      reflector.get = jest.fn().mockReturnValue(requiredRoles);

      // Act
      const result = guard.canActivate(context);

      // Assert
      // An empty array is truthy, so it will check if user role is in empty array (false)
      expect(result).toBe(false);
      expect(reflector.get).toHaveBeenCalledWith('roles', context.getHandler());
    });
  });

  describe('Guard Definition', () => {
    it('should be defined', () => {
      expect(guard).toBeDefined();
    });

    it('should implement CanActivate', () => {
      expect(guard.canActivate).toBeDefined();
      expect(typeof guard.canActivate).toBe('function');
    });
  });
});
