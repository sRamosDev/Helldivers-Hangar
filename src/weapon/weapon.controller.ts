import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { WeaponService } from './weapon.service';
import { Express } from 'express';
import { multerConfig, processImage } from '../utils/image-upload.util';
import { CreateWeaponDto } from './dto/createWeapon.dto';
import { UpdateWeaponDto } from './dto/updateWeapon.dto';
import { v4 as uuidv4 } from 'uuid';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { deleteFromAzure, uploadToAzure } from '../utils/azure-storage.util';

@ApiTags('weapon')
@Controller('weapon')
export class WeaponController {
  constructor(private readonly weaponService: WeaponService) {}

  @Post('image/:id')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiOperation({
    summary: 'Upload weapon image',
    description: 'Upload an image for a specific weapon item (Admin only)',
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'Weapon ID', type: Number })
  @ApiResponse({ status: 200, description: 'Image uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBody({
    description: 'Image file upload',
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Image file (JPEG, PNG, WEBP) max 5MB',
        },
      },
    },
  })
  async uploadWeaponImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    try {
      const weapon = await this.weaponService.findOne(+id);
      if (!weapon) throw new BadRequestException('Weapon not found');

      const processedBuffer = await processImage(file.buffer);
      const uniqueName = `${uuidv4()}.webp`;
      const imageUrl = await uploadToAzure(uniqueName, processedBuffer);

      if (weapon.image_url) {
        await deleteFromAzure(weapon.image_url);
      }

      await this.weaponService.updateImageUrl(+id, imageUrl);

      return { success: true, imageUrl };
    } catch (error) {
      throw new BadRequestException(error.message || 'Image upload failed');
    }
  }

  @Post()
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiOperation({
    summary: 'Create new weapon',
    description: 'Create weapon with details and image upload (Admin only)',
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Weapon created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBody({
    description: 'Weapon data with image file',
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Weapon image (JPEG, PNG, WEBP) max 5MB',
        },
        name: {
          type: 'string',
          example: 'AK-47',
          description: 'Weapon name (unique)',
        },
        description: {
          type: 'string',
          example: '7.62mm assault rifle',
        },
        type: {
          type: 'string',
          example: 'Assault Rifle',
          description: 'Weapon classification',
        },
        damage: {
          type: 'number',
          example: 45,
          description: 'Base damage per shot',
        },
        capacity: {
          type: 'number',
          example: 30,
          description: 'Magazine capacity',
        },
        recoil: {
          type: 'number',
          example: 6.5,
          description: 'Recoil intensity (0-10)',
        },
        fire_rate: {
          type: 'number',
          example: 600,
          description: 'Rounds per minute',
        },
        category: {
          type: 'string',
          enum: ['primary', 'secondary'],
          example: 'primary',
        },
        max_penetration: {
          type: 'string',
          enum: ['Light', 'Medium', 'Heavy'],
          example: 'Medium',
        },
        traits: {
          type: 'array',
          items: { type: 'number' },
          example: [1, 3],
          description: 'Array of trait IDs',
        },
        firing_modes: {
          type: 'array',
          items: { type: 'number' },
          example: [2, 4],
          description: 'Array of firing mode IDs',
        },
      },
    },
  })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() weaponData: CreateWeaponDto,
  ) {
    let imageUrl = '';
    if (file) {
      const processedBuffer = await processImage(file.buffer);
      imageUrl = await uploadToAzure(file.filename, processedBuffer);
    }
    return this.weaponService.create({ ...weaponData, imageUrl });
  }

  @Get()
  @ApiOperation({
    summary: 'Get all weapons',
    description: 'Retrieve paginated list of all available weapons',
  })
  @ApiResponse({
    status: 200,
    description: 'Weapons retrieved successfully',
  })
  async findAll() {
    return this.weaponService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get weapon details',
    description: 'Retrieve full details of a specific weapon by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Weapon ID',
    type: Number,
    example: 42,
  })
  @ApiResponse({ status: 200, description: 'Weapon details retrieved' })
  @ApiResponse({ status: 404, description: 'Weapon not found' })
  async findOne(@Param('id') id: string) {
    return this.weaponService.findOne(+id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiOperation({
    summary: 'Update weapon',
    description: 'Update weapon details and/or image (Admin only)',
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'Weapon ID', type: Number })
  @ApiResponse({ status: 200, description: 'Weapon updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBody({
    description: 'Weapon update data (partial)',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'New weapon image (optional)',
        },
        name: {
          type: 'string',
          example: 'AK-47 Mk II',
        },
        description: {
          type: 'string',
        },
        type: {
          type: 'string',
        },
        damage: {
          type: 'number',
        },
        capacity: {
          type: 'number',
        },
        recoil: {
          type: 'number',
        },
        fire_rate: {
          type: 'number',
        },
        category: {
          type: 'string',
          enum: ['primary', 'secondary'],
        },
        max_penetration: {
          type: 'string',
          enum: ['Light', 'Medium', 'Heavy'],
        },
        traits: {
          type: 'array',
          items: { type: 'number' },
        },
        firing_modes: {
          type: 'array',
          items: { type: 'number' },
        },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() weaponData: UpdateWeaponDto,
  ) {
    let imageUrl: string;

    if (file) {
      const processedBuffer = await processImage(file.buffer);
      const uniqueName = `${uuidv4()}.webp`;
      imageUrl = await uploadToAzure(uniqueName, processedBuffer);
      const weapon = await this.weaponService.findOne(+id);
      if (weapon?.image_url) await deleteFromAzure(weapon.image_url);
    } else {
      const weapon = await this.weaponService.findOne(+id);
      imageUrl = weapon.image_url;
    }

    return this.weaponService.update(+id, { ...weaponData, imageUrl });
  }
}
