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
import { GearService } from './gear.service';
import { Express } from 'express';
import { multerConfig, processImage } from '../utils/image-upload.util';
import { CreateGearDto } from './dto/createGear.dto';
import { UpdateGearDto } from './dto/updateGear.dto';
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

@ApiTags('Gear')
@Controller('gear')
export class GearController {
  constructor(private readonly gearService: GearService) {}

  @Post('image/:id')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiOperation({
    summary: 'Upload gear image',
    description: 'Upload an image for a specific gear item',
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'Gear ID', type: Number })
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
  async uploadGearImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    try {
      const gear = await this.gearService.findOne(+id);
      if (!gear) {
        // noinspection ExceptionCaughtLocallyJS
        throw new BadRequestException('Gear not found');
      }

      const processedBuffer = await processImage(file.buffer);
      const uniqueName = `${uuidv4()}.webp`;
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const imageUrl = await uploadToAzure(uniqueName, processedBuffer);

      if (gear.image_url) {
        await deleteFromAzure(gear.image_url);
      }

      await this.gearService.updateImageUrl(+id, imageUrl);

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
  @ApiOperation({ summary: 'Create a new gear' })
  @ApiResponse({ status: 201, description: 'Gear created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBody({ type: CreateGearDto })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() gearData: CreateGearDto,
  ) {
    let imageUrl = '';
    if (file) {
      const processedBuffer = await processImage(file.buffer);
      imageUrl = await uploadToAzure(file.filename, processedBuffer);
    }
    return this.gearService.create({ ...gearData, imageUrl });
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve all gear items',
    description: 'Retrieve paginated list of all available gears',
  })
  @ApiResponse({
    status: 200,
    description: 'Gears retrieved successfully',
  })
  async findAll() {
    return this.gearService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a gear item by ID' })
  @ApiParam({
    name: 'id',
    description: 'Gear ID',
    type: Number,
    example: 12,
  })
  @ApiResponse({ status: 200, description: 'Returns the gear item' })
  @ApiResponse({ status: 404, description: 'Gear item not found' })
  async findOne(@Param('id') id: string) {
    return this.gearService.findOne(+id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiOperation({
    summary: 'Update a gear item by ID',
    description: 'Update gear details and/or image (Admin only)',
  })
  @ApiParam({ name: 'id', description: 'Gear ID', type: Number })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'The gear item has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBody({ type: UpdateGearDto })
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() gearData: UpdateGearDto,
  ) {
    let imageUrl: string;

    if (file) {
      const processedBuffer = await processImage(file.buffer);
      const uniqueName = `${uuidv4()}.webp`;
      imageUrl = await uploadToAzure(uniqueName, processedBuffer);
      const gear = await this.gearService.findOne(+id);
      if (gear?.image_url) await deleteFromAzure(gear.image_url);
    } else {
      const gear = await this.gearService.findOne(+id);
      imageUrl = gear.image_url;
    }

    return this.gearService.update(+id, { ...gearData, imageUrl });
  }
}
