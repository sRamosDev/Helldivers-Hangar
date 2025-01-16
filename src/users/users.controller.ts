// users.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('admin')
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  @Roles('admin', 'user')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.usersService.getUserById(Number(id));
  }

  @Post()
  @Roles('admin')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Delete(':id')
  @Roles('admin')
  async deleteById(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteById(Number(id));
  }
}
