import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { ThrowableService } from './throwable.service';
import { Throwable } from './throwable.entity';
import { Express } from 'express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { multerConfig, processImage } from '../utils/image-upload.util';
import { AzureStorageUtil } from '../utils/azure-storage.util';
import { CreateThrowableDto } from './dto/createThrowable.dto';
import { UpdateThrowableDto } from './dto/updateThrowable.dto';

@Controller('throwables')
export class ThrowableController {
  constructor(
    private readonly throwableService: ThrowableService,
    private readonly azureStorageUtil: AzureStorageUtil,
  ) {}

  @Post('image/:id')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiOperation({
    summary: 'Upload throwable image',
    description: 'Upload an image for a specific throwable item (Admin only)',
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'Throwable ID', type: Number })
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
  async uploadThrowableImage(@UploadedFile() file: Express.Multer.File, @Param('id') id: number) {
    try {
      const throwable = await this.throwableService.findOne(id);
      if (!throwable) {
        throw new BadRequestException('Throwable not found');
      }
      const processedBuffer = await processImage(file.buffer);
      const uniqueName = `${uuidv4()}.webp`;
      const imageUrl = await this.azureStorageUtil.uploadToAzure(uniqueName, processedBuffer);
      if (throwable.image_url) {
        await this.azureStorageUtil.deleteFromAzure(throwable.image_url);
      }
      await this.throwableService.updateImageUrl(id, imageUrl);
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
  @ApiOperation({ summary: 'Create a new throwable' })
  @ApiResponse({ status: 201, description: 'Throwable created successfully', type: Throwable })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: CreateThrowableDto })
  async create(@UploadedFile() file: Express.Multer.File, @Body() throwableData: CreateThrowableDto) {
    let image_url = '';
    if (file) {
      const processedBuffer = await processImage(file.buffer);
      const uniqueName = `${uuidv4()}.webp`;
      image_url = await this.azureStorageUtil.uploadToAzure(uniqueName, processedBuffer);
    }
    return this.throwableService.create({ ...throwableData, image_url });
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all throwables' })
  @ApiResponse({ status: 200, description: 'Returns all throwables', type: [Throwable] })
  findAll(): Promise<Throwable[]> {
    return this.throwableService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a throwable by ID' })
  @ApiParam({ name: 'id', description: 'Throwable ID', type: Number })
  @ApiResponse({ status: 200, description: 'Returns the throwable', type: Throwable })
  @ApiResponse({ status: 404, description: 'Throwable not found' })
  findOne(@Param('id') id: number): Promise<Throwable> {
    return this.throwableService.findOne(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiOperation({
    summary: 'Update a throwable by ID',
    description: 'Update throwable details and/or image (Admin only)',
  })
  @ApiParam({ name: 'id', description: 'Throwable ID', type: Number })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'The throwable has been successfully updated', type: Throwable })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBody({ type: UpdateThrowableDto })
  async update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() throwableData: UpdateThrowableDto,
  ) {
    let image_url: string;
    if (file) {
      const processedBuffer = await processImage(file.buffer);
      const uniqueName = `${uuidv4()}.webp`;
      image_url = await this.azureStorageUtil.uploadToAzure(uniqueName, processedBuffer);
    } else {
      const throwable = await this.throwableService.findOne(id);
      image_url = throwable.image_url;
    }
    return this.throwableService.update(id, { ...throwableData, image_url });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a throwable by ID' })
  @ApiParam({ name: 'id', description: 'Throwable ID', type: Number })
  @ApiResponse({ status: 200, description: 'The throwable has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Throwable not found' })
  remove(@Param('id') id: number): Promise<void> {
    return this.throwableService.remove(id);
  }
}
