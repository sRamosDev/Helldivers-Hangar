import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ActivityLogService } from '../activity-log/activity-log.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private activityLogService: ActivityLogService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { displayName, username, email, password } = signUpDto;

    // Check for existing email OR username
    const existingUser = await this.usersRepository.findOne({
      where: [{ email }, { username }],
    });

    if (existingUser) {
      throw new ConflictException('Email or username already exists');
    }
    if (password.length > 72) {
      throw new BadRequestException('Password must be less than 72 characters');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const userCount = await this.usersRepository.count();
    const role = userCount === 0 ? 'admin' : 'user';

    const user = this.usersRepository.create({
      displayName,
      username,
      email,
      password: hashedPassword,
      role,
    });

    await this.usersRepository.save(user);
    const token = this.jwtService.sign({ id: user.id, role: user.role });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { usernameOrEmail, password } = loginDto;

    const user = await this.usersRepository.findOne({
      where: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (password.length > 72) {
      throw new BadRequestException('Password must be less than 72 characters');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ id: user.id, role: user.role });
    return { token };
  }
}
