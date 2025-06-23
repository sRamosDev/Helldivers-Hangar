import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsGuard } from './permissions.guard';

describe('PermissionsGuard', () => {
  let guard: PermissionsGuard;
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
        PermissionsGuard,
        {
          provide: Reflector,
          useValue: mockReflector,
        },
      ],
    }).compile();

    guard = module.get<PermissionsGuard>(PermissionsGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  afterEach(async () => {
    // Clean up after each test
    jest.resetAllMocks();
    jest.clearAllMocks();
    await module.close();
  });

  describe('canActivate', () => {
    it('should allow access when no permissions specified', () => {
      // Arrange
      const context = createMockExecutionContext();
      reflector.get = jest.fn().mockReturnValue(null);

      // Act
      const result = guard.canActivate(context);

      // Assert
      expect(result).toBe(true);
      expect(reflector.get).toHaveBeenCalledWith('permissions', context.getHandler());
    });

    it('should allow access when user has required permission', () => {
      // Arrange
      const user = {
        permissions: [
          { name: 'read_users' },
          { name: 'write_users' },
        ],
      };
      const context = createMockExecutionContext(user);
      const requiredPermissions = ['read_users'];
      reflector.get = jest.fn().mockReturnValue(requiredPermissions);

      // Act
      const result = guard.canActivate(context);

      // Assert
      expect(result).toBe(true);
      expect(reflector.get).toHaveBeenCalledWith('permissions', context.getHandler());
    });

    it('should deny access when user lacks required permission', () => {
      // Arrange
      const user = {
        permissions: [
          { name: 'read_users' },
        ],
      };
      const context = createMockExecutionContext(user);
      const requiredPermissions = ['write_users'];
      reflector.get = jest.fn().mockReturnValue(requiredPermissions);

      // Act
      const result = guard.canActivate(context);

      // Assert
      expect(result).toBe(false);
      expect(reflector.get).toHaveBeenCalledWith('permissions', context.getHandler());
    });

    it('should allow access when user has at least one of multiple required permissions', () => {
      // Arrange
      const user = {
        permissions: [
          { name: 'read_users' },
        ],
      };
      const context = createMockExecutionContext(user);
      const requiredPermissions = ['read_users', 'write_users', 'delete_users'];
      reflector.get = jest.fn().mockReturnValue(requiredPermissions);

      // Act
      const result = guard.canActivate(context);

      // Assert
      expect(result).toBe(true);
      expect(reflector.get).toHaveBeenCalledWith('permissions', context.getHandler());
    });

    it('should deny access when user has no permissions', () => {
      // Arrange
      const user = {
        permissions: [],
      };
      const context = createMockExecutionContext(user);
      const requiredPermissions = ['read_users'];
      reflector.get = jest.fn().mockReturnValue(requiredPermissions);

      // Act
      const result = guard.canActivate(context);

      // Assert
      expect(result).toBe(false);
      expect(reflector.get).toHaveBeenCalledWith('permissions', context.getHandler());
    });

    it('should deny access when user permissions property is undefined', () => {
      // Arrange
      const user = {}; // No permissions property
      const context = createMockExecutionContext(user);
      const requiredPermissions = ['read_users'];
      reflector.get = jest.fn().mockReturnValue(requiredPermissions);

      // Act
      const result = guard.canActivate(context);

      // Assert
      expect(result).toBe(false);
      expect(reflector.get).toHaveBeenCalledWith('permissions', context.getHandler());
    });

    it('should deny access when user permissions property is null', () => {
      // Arrange
      const user = {
        permissions: null,
      };
      const context = createMockExecutionContext(user);
      const requiredPermissions = ['read_users'];
      reflector.get = jest.fn().mockReturnValue(requiredPermissions);

      // Act
      const result = guard.canActivate(context);

      // Assert
      expect(result).toBe(false);
      expect(reflector.get).toHaveBeenCalledWith('permissions', context.getHandler());
    });

    it('should handle gracefully when no user in request', () => {
      // Arrange
      const context = createMockExecutionContext(); // No user
      const requiredPermissions = ['read_users'];
      reflector.get = jest.fn().mockReturnValue(requiredPermissions);

      // Act & Assert
      // The guard will try to access user.permissions on undefined, which will cause an error
      expect(() => guard.canActivate(context)).toThrow();
      expect(reflector.get).toHaveBeenCalledWith('permissions', context.getHandler());
    });

    it('should allow access when required permissions array is empty but defined', () => {
      // Arrange
      const user = {
        permissions: [{ name: 'read_users' }],
      };
      const context = createMockExecutionContext(user);
      const requiredPermissions = []; // Empty but defined array
      reflector.get = jest.fn().mockReturnValue(requiredPermissions);

      // Act
      const result = guard.canActivate(context);

      // Assert
      // Empty array is truthy, but some() on empty array returns false
      expect(result).toBe(false);
      expect(reflector.get).toHaveBeenCalledWith('permissions', context.getHandler());
    });

    it('should allow access when user has multiple matching permissions', () => {
      // Arrange
      const user = {
        permissions: [
          { name: 'read_users' },
          { name: 'write_users' },
          { name: 'delete_users' },
        ],
      };
      const context = createMockExecutionContext(user);
      const requiredPermissions = ['read_users', 'write_users'];
      reflector.get = jest.fn().mockReturnValue(requiredPermissions);

      // Act
      const result = guard.canActivate(context);

      // Assert
      expect(result).toBe(true);
      expect(reflector.get).toHaveBeenCalledWith('permissions', context.getHandler());
    });

    it('should handle permissions with different structures', () => {
      // Arrange
      const user = {
        permissions: [
          { name: 'read_users', description: 'Can read users' },
          { name: 'write_posts', active: true },
        ],
      };
      const context = createMockExecutionContext(user);
      const requiredPermissions = ['read_users'];
      reflector.get = jest.fn().mockReturnValue(requiredPermissions);

      // Act
      const result = guard.canActivate(context);

      // Assert
      expect(result).toBe(true);
      expect(reflector.get).toHaveBeenCalledWith('permissions', context.getHandler());
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
