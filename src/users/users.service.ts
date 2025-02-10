import { ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './users.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    return this.usersRepository.find();
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    if (!user) throw new NotFoundException('Could not find the user');
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { displayName, username, email, password } = createUserDto;

    const sanitizedDto = {
      displayName: displayName.trim(),
      username: username.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
    };

    const existingUser = await this.usersRepository.findOne({
      where: [{ email: sanitizedDto.email }, { username: sanitizedDto.username }],
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    const hashedPassword = await bcrypt.hash(sanitizedDto.password, 12);

    const newUser = this.usersRepository.create({
      ...sanitizedDto,
      password: hashedPassword,
    });

    await this.usersRepository.save(newUser);
    return newUser;
  }

  async updateUserById(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { displayName, email, password, role } = updateUserDto;

    if (displayName) {
      user.displayName = displayName.trim();
    }
    if (email) {
      user.email = email.trim().toLowerCase();
    }
    if (password) {
      user.password = await bcrypt.hash(password.trim(), 12);
    }
    if (role) {
      user.role = role;
    }

    await this.usersRepository.save(user);
    return user;
  }

  async deleteById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) return null;

    await this.usersRepository.remove(user);
    return user;
  }

  async deactivateUser(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.isActive = false;
    await this.usersRepository.save(user);
    return user;
  }

  async reactivateUser(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.isActive = true;
    await this.usersRepository.save(user);
    return user;
  }

  async getUserWithPermissions(id: number) {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
  }
}
