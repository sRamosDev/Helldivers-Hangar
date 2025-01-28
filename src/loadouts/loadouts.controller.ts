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
import { LoadoutsService } from './loadouts.service';
import { Loadout } from './loadout.entity';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateLoadoutDto } from './dto/CreateLoadout.dto';
import { UpdateLoadoutDto } from './dto/UpdateLoadout.dto';

@ApiTags('Loadouts')
@Controller('loadouts')
export class LoadoutsController {
  constructor(private readonly loadoutsService: LoadoutsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new loadout' })
  @ApiResponse({
    status: 201,
    description: 'The loadout has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  async create(
    @Body()
    loadoutData: CreateLoadoutDto,
  ) {
    return this.loadoutsService.create(loadoutData);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all loadouts' })
  @ApiResponse({ status: 200, description: 'Returns all loadouts' })
  async findAll(): Promise<Loadout[]> {
    return this.loadoutsService.findAll();
  }

  @Get(':uniqueId')
  @ApiOperation({ summary: 'Retrieve a loadout by unique ID' })
  @ApiResponse({ status: 200, description: 'Returns the loadout' })
  @ApiResponse({ status: 404, description: 'Loadout not found' })
  async findOne(@Param('uniqueId') uniqueId: string): Promise<Loadout> {
    return this.loadoutsService.findOne(uniqueId);
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Update a loadout by ID' })
  @ApiResponse({
    status: 200,
    description: 'The loadout has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Loadout not found' })
  async update(
    @Param('id') id: string,
    @Body()
    loadoutData: UpdateLoadoutDto,
  ) {
    return this.loadoutsService.update(+id, loadoutData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a loadout by ID' })
  @ApiResponse({
    status: 200,
    description: 'The loadout has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Loadout not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.loadoutsService.remove(+id);
  }
}
