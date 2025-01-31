import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TraitService } from './trait.service';
import { Trait } from './trait.entity';
import { CreateTraitDto } from './dto/CreateTrait.dto';
import { UpdateTraitDto } from './dto/UpdateTrait.dto';

@Controller('traits')
export class TraitController {
  constructor(private readonly traitService: TraitService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTraitDto: CreateTraitDto): Promise<Trait> {
    return this.traitService.create(createTraitDto);
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
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: number,
    @Body() updateTraitDto: UpdateTraitDto,
  ): Promise<Trait> {
    return this.traitService.update(id, updateTraitDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.traitService.remove(id);
  }
}
