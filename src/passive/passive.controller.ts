import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PassiveService } from './passive.service';
import { Passive } from './passive.entity';
import { CreatePassiveDto } from './dto/createPassive.dto';
import { UpdatePassiveDto } from './dto/updatePassive.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('passives')
@Controller('passives')
export class PassiveController {
  constructor(private readonly passiveService: PassiveService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all passive abilities' })
  @ApiResponse({
    status: 200,
    description: 'Returns all passive abilities',
    type: [Passive],
  })
  findAll(): Promise<Passive[]> {
    return this.passiveService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a passive ability by ID' })
  @ApiParam({ name: 'id', description: 'Passive ID', type: Number, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Returns the passive ability',
    type: Passive,
  })
  @ApiResponse({ status: 404, description: 'Passive ability not found' })
  findOne(@Param('id') id: number): Promise<Passive> {
    return this.passiveService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new passive ability' })
  @ApiResponse({
    status: 201,
    description: 'The passive ability has been successfully created.',
    type: Passive,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreatePassiveDto })
  create(@Body() createPassiveDto: CreatePassiveDto): Promise<Passive> {
    return this.passiveService.create(createPassiveDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a passive ability by ID' })
  @ApiParam({ name: 'id', description: 'Passive ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The passive ability has been successfully updated.',
    type: Passive,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Passive ability not found' })
  @ApiBody({ type: UpdatePassiveDto })
  update(@Param('id') id: number, @Body() updatePassiveDto: UpdatePassiveDto): Promise<Passive> {
    return this.passiveService.update(id, updatePassiveDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a passive ability by ID' })
  @ApiParam({ name: 'id', description: 'Passive ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The passive ability has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Passive ability not found' })
  remove(@Param('id') id: number): Promise<void> {
    return this.passiveService.remove(id);
  }
}
