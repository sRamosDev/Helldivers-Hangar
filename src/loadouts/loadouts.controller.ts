import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoadoutsService } from './loadouts.service';
import { Loadout } from './loadout.entity';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateLoadoutDto } from './dto/CreateLoadout.dto';
import { UpdateLoadoutDto } from './dto/UpdateLoadout.dto';
import { User } from '../users/users.entity';
import { TurnstileGuard } from '../auth/turnstile.guard';

@ApiTags('Loadouts')
@Controller('loadouts')
export class LoadoutsController {
  constructor(private readonly loadoutsService: LoadoutsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new loadout',
    description: 'Creates a new loadout with the provided data.',
  })
  @ApiResponse({
    status: 201,
    description: 'The loadout has been successfully created.',
    type: Loadout,
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid input data.' })
  @ApiBody({
    description: 'Payload for creating a new loadout',
    type: CreateLoadoutDto,
    examples: {
      example1: {
        summary: 'Basic loadout example',
        value: {
          name: 'Stealth Loadout',
          helmetId: 1,
          armorId: 2,
          capeId: 3,
          primaryWeaponId: 4,
          secondaryWeaponId: 36,
          throwableId: 6,
          cfTurnstileToken: 'turnstile-token-from-frontend',
        },
      },
    },
  })
  @UseGuards(TurnstileGuard)
  async create(@Body() loadoutData: CreateLoadoutDto, @Request() req): Promise<Loadout> {
    const user: User = req.user;
    return this.loadoutsService.create(loadoutData, user);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve all loadouts',
    description: 'Returns a list of all available loadouts.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all loadouts.',
    type: [Loadout],
  })
  async findAll(): Promise<Loadout[]> {
    return this.loadoutsService.findAll();
  }

  @Get(':uniqueId')
  @ApiOperation({
    summary: 'Retrieve a loadout by unique ID',
    description: 'Fetches a specific loadout using its unique ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the loadout.',
    type: Loadout,
  })
  @ApiResponse({ status: 404, description: 'Loadout not found.' })
  async findOne(@Param('uniqueId') uniqueId: string): Promise<Loadout> {
    return this.loadoutsService.findOne(uniqueId);
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a loadout by ID',
    description: 'Allows admins to update a specific loadout.',
  })
  @ApiResponse({
    status: 200,
    description: 'The loadout has been successfully updated.',
    type: Loadout,
  })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Loadout not found.' })
  @ApiBody({
    description: 'Payload for updating a loadout',
    type: UpdateLoadoutDto,
    examples: {
      example1: {
        summary: 'Update loadout name',
        value: {
          name: 'Tactical Assault Loadout',
        },
      },
    },
  })
  async update(@Param('id') id: string, @Body() loadoutData: UpdateLoadoutDto, @Request() req): Promise<Loadout> {
    const user: User = req.user;
    const loadout = await this.loadoutsService.findOneById(+id);
    if (!loadout) {
      throw new ForbiddenException('Loadout not found');
    }
    if (loadout.createdBy?.id !== user.id && user.role !== 'admin') {
      throw new ForbiddenException('You do not have permission to update this loadout');
    }
    return this.loadoutsService.update(+id, loadoutData);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a loadout by ID',
    description: 'Allows admins to delete a specific loadout.',
  })
  @ApiResponse({
    status: 200,
    description: 'The loadout has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Loadout not found.' })
  async remove(@Param('id') id: string, @Request() req): Promise<void> {
    const user: User = req.user;
    const loadout = await this.loadoutsService.findOneById(+id);
    if (!loadout) {
      throw new ForbiddenException('Loadout not found');
    }
    if (loadout.createdBy?.id !== user.id && user.role !== 'admin') {
      throw new ForbiddenException('You do not have permission to delete this loadout');
    }
    return this.loadoutsService.remove(+id);
  }
}
