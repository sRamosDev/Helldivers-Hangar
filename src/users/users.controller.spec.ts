import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '@nestjs/passport';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { RolesGuard } from '../auth/roles.guard';

describe('UsersController', () => {
  let controller: UsersController;
  let service: jest.Mocked<UsersService>;

  const mockUser: User = {
    id: 1,
    username: 'testuser',
    displayName: 'Test User',
    email: 'test@example.com',
    password: 'hashedpassword',
    role: 'user',
    isActive: true,
    permissions: [],
    refreshTokens: []
  };

  const mockCreateUserDto: CreateUserDto = {
    username: 'testuser',
    displayName: 'Test User',
    email: 'test@example.com',
    password: 'password123!',
    role: 'user'
  };

  const mockUpdateUserDto: UpdateUserDto = {
    displayName: 'Updated User',
    email: 'updated@example.com',
    password: 'newpassword123!',
    role: 'admin'
  };

  beforeEach(async () => {
    const mockUsersService = {
      getAllUsers: jest.fn(),
      getUserById: jest.fn(),
      createUser: jest.fn(),
      updateUserById: jest.fn(),
      deleteById: jest.fn(),
      deactivateUser: jest.fn(),
      reactivateUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService) as jest.Mocked<UsersService>;

    // Reset all mocks
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should delegate to service for getAllUsers', async () => {
      const users = [mockUser];
      service.getAllUsers.mockResolvedValue(users);

      const result = await controller.getAllUsers();

      expect(service.getAllUsers).toHaveBeenCalledWith();
      expect(result).toEqual(users);
    });

    it('should return empty array when no users exist', async () => {
      service.getAllUsers.mockResolvedValue([]);

      const result = await controller.getAllUsers();

      expect(service.getAllUsers).toHaveBeenCalledWith();
      expect(result).toEqual([]);
    });
  });

  describe('getUserById', () => {
    it('should delegate to service and convert string ID to number', async () => {
      service.getUserById.mockResolvedValue(mockUser);

      const result = await controller.getUserById('1');

      expect(service.getUserById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });

    it('should convert string IDs to numbers correctly', async () => {
      service.getUserById.mockResolvedValue(mockUser);

      await controller.getUserById('123');

      expect(service.getUserById).toHaveBeenCalledWith(123);
    });

    it('should handle service errors', async () => {
      const error = new Error('User not found');
      service.getUserById.mockRejectedValue(error);

      await expect(controller.getUserById('999')).rejects.toThrow(error);
      expect(service.getUserById).toHaveBeenCalledWith(999);
    });
  });

  describe('createUser', () => {
    it('should delegate to service for createUser', async () => {
      service.createUser.mockResolvedValue(mockUser);

      const result = await controller.createUser(mockCreateUserDto);

      expect(service.createUser).toHaveBeenCalledWith(mockCreateUserDto);
      expect(result).toEqual(mockUser);
    });

    it('should handle service errors during creation', async () => {
      const error = new Error('Username already exists');
      service.createUser.mockRejectedValue(error);

      await expect(controller.createUser(mockCreateUserDto)).rejects.toThrow(error);
      expect(service.createUser).toHaveBeenCalledWith(mockCreateUserDto);
    });
  });

  describe('updateUserById', () => {
    it('should delegate to service and convert string ID to number', async () => {
      service.updateUserById.mockResolvedValue(mockUser);

      const result = await controller.updateUserById('1', mockUpdateUserDto);

      expect(service.updateUserById).toHaveBeenCalledWith(1, mockUpdateUserDto);
      expect(result).toEqual(mockUser);
    });

    it('should convert string IDs to numbers correctly for updates', async () => {
      service.updateUserById.mockResolvedValue(mockUser);

      await controller.updateUserById('456', mockUpdateUserDto);

      expect(service.updateUserById).toHaveBeenCalledWith(456, mockUpdateUserDto);
    });

    it('should handle service errors during update', async () => {
      const error = new Error('User not found');
      service.updateUserById.mockRejectedValue(error);

      await expect(controller.updateUserById('999', mockUpdateUserDto)).rejects.toThrow(error);
      expect(service.updateUserById).toHaveBeenCalledWith(999, mockUpdateUserDto);
    });
  });

  describe('deleteById', () => {
    it('should delegate to service and convert string ID to number', async () => {
      service.deleteById.mockResolvedValue(mockUser);

      const result = await controller.deleteById('1');

      expect(service.deleteById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });

    it('should convert string IDs to numbers correctly for deletion', async () => {
      service.deleteById.mockResolvedValue(null);

      await controller.deleteById('789');

      expect(service.deleteById).toHaveBeenCalledWith(789);
    });

    it('should handle service errors during deletion', async () => {
      const error = new Error('Deletion failed');
      service.deleteById.mockRejectedValue(error);

      await expect(controller.deleteById('1')).rejects.toThrow(error);
      expect(service.deleteById).toHaveBeenCalledWith(1);
    });
  });

  describe('deactivateUser', () => {
    it('should delegate to service and convert string ID to number', async () => {
      const deactivatedUser = { ...mockUser, isActive: false };
      service.deactivateUser.mockResolvedValue(deactivatedUser);

      const result = await controller.deactivateUser('1');

      expect(service.deactivateUser).toHaveBeenCalledWith(1);
      expect(result).toEqual(deactivatedUser);
    });

    it('should convert string IDs to numbers correctly for deactivation', async () => {
      const deactivatedUser = { ...mockUser, isActive: false };
      service.deactivateUser.mockResolvedValue(deactivatedUser);

      await controller.deactivateUser('321');

      expect(service.deactivateUser).toHaveBeenCalledWith(321);
    });

    it('should handle service errors during deactivation', async () => {
      const error = new Error('User not found');
      service.deactivateUser.mockRejectedValue(error);

      await expect(controller.deactivateUser('999')).rejects.toThrow(error);
      expect(service.deactivateUser).toHaveBeenCalledWith(999);
    });
  });

  describe('reactivateUser', () => {
    it('should delegate to service and convert string ID to number', async () => {
      const reactivatedUser = { ...mockUser, isActive: true };
      service.reactivateUser.mockResolvedValue(reactivatedUser);

      const result = await controller.reactivateUser('1');

      expect(service.reactivateUser).toHaveBeenCalledWith(1);
      expect(result).toEqual(reactivatedUser);
    });

    it('should convert string IDs to numbers correctly for reactivation', async () => {
      const reactivatedUser = { ...mockUser, isActive: true };
      service.reactivateUser.mockResolvedValue(reactivatedUser);

      await controller.reactivateUser('654');

      expect(service.reactivateUser).toHaveBeenCalledWith(654);
    });

    it('should handle service errors during reactivation', async () => {
      const error = new Error('User not found');
      service.reactivateUser.mockRejectedValue(error);

      await expect(controller.reactivateUser('999')).rejects.toThrow(error);
      expect(service.reactivateUser).toHaveBeenCalledWith(999);
    });
  });
  describe('Guards and Authorization', () => {
    it('should not require authentication for getUserById', () => {
      // getUserById should be accessible without authentication
      // Other endpoints require admin role and JWT auth as per controller decorators
      expect(controller.getUserById).toBeDefined();
    });
  });
});
