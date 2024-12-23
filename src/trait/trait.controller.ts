import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TraitService } from './trait.service';
import { Trait } from './trait.entity';

@Controller('traits')
export class TraitController {
  constructor(private readonly traitService: TraitService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() trait: Partial<Trait>): Promise<Trait> {
    return this.traitService.create(trait);
  }

  @Get()
  findAll(): Promise<Trait[]> {
    return this.traitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Trait> {
    return this.traitService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() trait: Partial<Trait>,
  ): Promise<Trait> {
    return this.traitService.update(id, trait);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.traitService.remove(id);
  }
}
