import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
    const { name, email, password } = signUpDto;

    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userCount = await this.usersRepository.count();
    const role = userCount === 0 ? 'admin' : 'user';

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await this.usersRepository.save(user);

    const token = this.jwtService.sign({ id: user.id, role: user.role });

    await this.usersRepository.save(user);

    await this.activityLogService.logAction(user.id, 'User signed up');
    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user.id, role: user.role });

    await this.usersRepository.save(user);

    await this.activityLogService.logAction(user.id, 'User logged in');
    return { token };
  }
}
