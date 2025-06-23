import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

// Mock bcrypt
jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
}));
const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe('UsersService', () => {
  let service: UsersService;
  let repository: jest.Mocked<Repository<User>>;

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
    username: ' TestUser ',
    displayName: ' Test User ',
    email: ' TEST@EXAMPLE.COM ',
    password: ' password123! ',
    role: 'user'
  };

  const mockUpdateUserDto: UpdateUserDto = {
    displayName: 'Updated User',
    email: 'updated@example.com',
    password: 'newpassword123!',
    role: 'admin'
  };

  beforeEach(async () => {
    const mockRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User)) as jest.Mocked<Repository<User>>;    // Reset all mocks
    jest.clearAllMocks();
    (mockBcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const users = [mockUser];
      repository.find.mockResolvedValue(users);

      const result = await service.getAllUsers();

      expect(repository.find).toHaveBeenCalledWith();
      expect(result).toEqual(users);
    });

    it('should return empty array when no users exist', async () => {
      repository.find.mockResolvedValue([]);

      const result = await service.getAllUsers();

      expect(repository.find).toHaveBeenCalledWith();
      expect(result).toEqual([]);
    });
  });

  describe('getUserById', () => {
    it('should return user by ID when found', async () => {
      repository.findOne.mockResolvedValue(mockUser);

      const result = await service.getUserById(1);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 }
      });
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException when user not found by ID', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.getUserById(999)).rejects.toThrow(
        new NotFoundException('Could not find the user')
      );

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 999 }
      });
    });
  });

  describe('createUser', () => {
    it('should create user with sanitized data', async () => {
      repository.findOne.mockResolvedValue(null); // No existing user
      repository.create.mockReturnValue(mockUser);
      repository.save.mockResolvedValue(mockUser);

      const result = await service.createUser(mockCreateUserDto);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: [
          { email: 'test@example.com' },
          { username: 'testuser' }
        ]
      });
      expect(mockBcrypt.hash).toHaveBeenCalledWith('password123!', 12);
      expect(repository.create).toHaveBeenCalledWith({
        displayName: 'Test User',
        username: 'testuser',
        email: 'test@example.com',
        password: 'hashedpassword'
      });
      expect(repository.save).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });

    it('should hash password when creating user', async () => {
      repository.findOne.mockResolvedValue(null);
      repository.create.mockReturnValue(mockUser);
      repository.save.mockResolvedValue(mockUser);
      (mockBcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword123');

      await service.createUser(mockCreateUserDto);

      expect(mockBcrypt.hash).toHaveBeenCalledWith('password123!', 12);
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          password: 'hashedpassword123'
        })
      );
    });

    it('should throw ConflictException when username exists', async () => {
      const existingUser = { ...mockUser, username: 'testuser' };
      repository.findOne.mockResolvedValue(existingUser);

      await expect(service.createUser(mockCreateUserDto)).rejects.toThrow(
        new ConflictException('Username or email already exists')
      );

      expect(repository.findOne).toHaveBeenCalledWith({
        where: [
          { email: 'test@example.com' },
          { username: 'testuser' }
        ]
      });
      expect(repository.create).not.toHaveBeenCalled();
      expect(repository.save).not.toHaveBeenCalled();
    });

    it('should throw ConflictException when email exists', async () => {
      const existingUser = { ...mockUser, email: 'test@example.com' };
      repository.findOne.mockResolvedValue(existingUser);

      await expect(service.createUser(mockCreateUserDto)).rejects.toThrow(
        new ConflictException('Username or email already exists')
      );

      expect(repository.findOne).toHaveBeenCalledWith({
        where: [
          { email: 'test@example.com' },
          { username: 'testuser' }
        ]
      });
      expect(repository.create).not.toHaveBeenCalled();
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('updateUserById', () => {
    it('should update user with partial data', async () => {
      const userToUpdate = { ...mockUser };
      repository.findOne.mockResolvedValue(userToUpdate);
      repository.save.mockResolvedValue(userToUpdate);      const result = await service.updateUserById(1, {
        displayName: 'Updated Name'
      } as UpdateUserDto);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(userToUpdate.displayName).toBe('Updated Name');
      expect(repository.save).toHaveBeenCalledWith(userToUpdate);
      expect(result).toEqual(userToUpdate);
    });

    it('should hash password when updating', async () => {
      const userToUpdate = { ...mockUser };
      repository.findOne.mockResolvedValue(userToUpdate);
      repository.save.mockResolvedValue(userToUpdate);      (mockBcrypt.hash as jest.Mock).mockResolvedValue('newhashedpassword');

      await service.updateUserById(1, {
        password: ' newpassword123! '
      } as UpdateUserDto);

      expect(mockBcrypt.hash).toHaveBeenCalledWith('newpassword123!', 12);
      expect(userToUpdate.password).toBe('newhashedpassword');
      expect(repository.save).toHaveBeenCalledWith(userToUpdate);
    });

    it('should update display name, email, and role correctly', async () => {
      const userToUpdate = { ...mockUser };
      repository.findOne.mockResolvedValue(userToUpdate);
      repository.save.mockResolvedValue(userToUpdate);

      await service.updateUserById(1, mockUpdateUserDto);

      expect(userToUpdate.displayName).toBe('Updated User');
      expect(userToUpdate.email).toBe('updated@example.com');
      expect(userToUpdate.role).toBe('admin');
      expect(repository.save).toHaveBeenCalledWith(userToUpdate);
    });

    it('should throw NotFoundException when updating non-existent user', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.updateUserById(999, mockUpdateUserDto)).rejects.toThrow(
        new NotFoundException('User not found')
      );

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('deleteById', () => {
    it('should delete user by ID', async () => {
      repository.findOne.mockResolvedValue(mockUser);
      repository.remove.mockResolvedValue(mockUser);

      const result = await service.deleteById(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.remove).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });

    it('should return null when deleting non-existent user', async () => {
      repository.findOne.mockResolvedValue(null);

      const result = await service.deleteById(999);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
      expect(repository.remove).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe('deactivateUser', () => {
    it('should deactivate user correctly', async () => {
      const userToDeactivate = { ...mockUser, isActive: true };
      repository.findOne.mockResolvedValue(userToDeactivate);
      repository.save.mockResolvedValue(userToDeactivate);

      const result = await service.deactivateUser(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(userToDeactivate.isActive).toBe(false);
      expect(repository.save).toHaveBeenCalledWith(userToDeactivate);
      expect(result).toEqual(userToDeactivate);
    });

    it('should throw NotFoundException when deactivating non-existent user', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.deactivateUser(999)).rejects.toThrow(
        new NotFoundException('User not found')
      );

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('reactivateUser', () => {
    it('should reactivate user correctly', async () => {
      const userToReactivate = { ...mockUser, isActive: false };
      repository.findOne.mockResolvedValue(userToReactivate);
      repository.save.mockResolvedValue(userToReactivate);

      const result = await service.reactivateUser(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(userToReactivate.isActive).toBe(true);
      expect(repository.save).toHaveBeenCalledWith(userToReactivate);
      expect(result).toEqual(userToReactivate);
    });

    it('should throw NotFoundException when reactivating non-existent user', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.reactivateUser(999)).rejects.toThrow(
        new NotFoundException('User not found')
      );

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('getUserWithPermissions', () => {
    it('should return user with permissions', async () => {
      const userWithPermissions = {
        ...mockUser,
        permissions: [{ id: 1, name: 'read', resource: 'users' }]
      };
      repository.findOne.mockResolvedValue(userWithPermissions as any);

      const result = await service.getUserWithPermissions(1);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['permissions']
      });
      expect(result).toEqual(userWithPermissions);
    });

    it('should return null when user not found', async () => {
      repository.findOne.mockResolvedValue(null);

      const result = await service.getUserWithPermissions(999);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 999 },
        relations: ['permissions']
      });
      expect(result).toBeNull();
    });
  });
});
