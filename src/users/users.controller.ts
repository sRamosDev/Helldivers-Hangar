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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.usersService.getUserById(Number(id));
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteById(Number(id));
  }
}
