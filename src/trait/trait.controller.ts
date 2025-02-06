import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TraitService } from './trait.service';
import { Trait } from './trait.entity';
import { CreateTraitDto } from './dto/createTrait.dto';
import { UpdateTraitDto } from './dto/updateTrait.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('traits')
@Controller('traits')
export class TraitController {
  constructor(private readonly traitService: TraitService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new trait' })
  @ApiResponse({ status: 201, description: 'The trait has been successfully created.', type: Trait })
  create(@Body() createTraitDto: CreateTraitDto): Promise<Trait> {
    return this.traitService.create(createTraitDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all traits' })
  @ApiResponse({ status: 200, description: 'Returns all traits', type: [Trait] })
  findAll(): Promise<Trait[]> {
    return this.traitService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a trait by ID' })
  @ApiParam({ name: 'id', description: 'Trait ID', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Returns the trait', type: Trait })
  @ApiResponse({ status: 404, description: 'Trait not found' })
  findOne(@Param('id') id: number): Promise<Trait> {
    return this.traitService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a trait by ID' })
  @ApiParam({ name: 'id', description: 'Trait ID', type: Number })
  @ApiResponse({ status: 200, description: 'The trait has been successfully updated.', type: Trait })
  @ApiResponse({ status: 404, description: 'Trait not found' })
  update(@Param('id') id: number, @Body() updateTraitDto: UpdateTraitDto): Promise<Trait> {
    return this.traitService.update(id, updateTraitDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a trait by ID' })
  @ApiParam({ name: 'id', description: 'Trait ID', type: Number })
  @ApiResponse({ status: 200, description: 'The trait has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Trait not found' })
  remove(@Param('id') id: number): Promise<void> {
    return this.traitService.remove(id);
  }
}
