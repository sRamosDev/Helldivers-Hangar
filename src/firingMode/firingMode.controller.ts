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
import { FiringModeService } from './firingMode.service';
import { FiringMode } from './firingMode.entity';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('firing-modes')
@Controller('firing-modes')
export class FiringModeController {
  constructor(private readonly firingModeService: FiringModeService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all firing modes' })
  @ApiResponse({ status: 200, description: 'Returns all firing modes' })
  findAll(): Promise<FiringMode[]> {
    return this.firingModeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a firing mode by ID' })
  @ApiParam({
    name: 'id',
    description: 'Firing Mode ID',
    type: Number,
    example: 1,
  })
  @ApiResponse({ status: 200, description: 'Returns the firing mode' })
  @ApiResponse({ status: 404, description: 'Firing mode not found' })
  findOne(@Param('id') id: number): Promise<FiringMode> {
    return this.firingModeService.findOne(id);
  }

  @Post()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Create a new firing mode' })
  @ApiResponse({
    status: 201,
    description: 'The firing mode has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({
    description: 'Firing mode data',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Single Shot' },
      },
    },
  })
  create(@Body() firingMode: FiringMode): Promise<FiringMode> {
    return this.firingModeService.create(firingMode);
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Update a firing mode by ID' })
  @ApiParam({ name: 'id', description: 'Firing Mode ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The firing mode has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Firing mode not found' })
  @ApiBody({
    description: 'Updated firing mode data',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Burst Fire' },
      },
    },
  })
  update(
    @Param('id') id: number,
    @Body() firingMode: FiringMode,
  ): Promise<FiringMode> {
    return this.firingModeService.update(id, firingMode);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Delete a firing mode by ID' })
  @ApiParam({ name: 'id', description: 'Firing Mode ID', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The firing mode has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Firing mode not found' })
  remove(@Param('id') id: number): Promise<void> {
    return this.firingModeService.remove(id);
  }
}
