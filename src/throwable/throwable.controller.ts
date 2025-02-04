import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile, UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { ThrowableService } from './throwable.service';
import { Throwable } from './throwable.entity';
import { Express } from 'express';
import { DeepPartial } from 'typeorm';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { Roles } from "../auth/roles.decorator";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../auth/roles.guard";
import { multerConfig, processImage } from "../utils/image-upload.util";
import { deleteFromAzure, uploadToAzure } from "../utils/azure-storage.util";
import { CreateThrowableDto } from "./dto/createThrowable.dto";

@Controller('throwables')
export class ThrowableController {
  constructor(private readonly throwableService: ThrowableService) {}

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
      const throwable = await this.throwableService.findOne(+id);
      if (!throwable) {
        // noinspection ExceptionCaughtLocallyJS
        throw new BadRequestException('Throwable not found');
      }

      const processedBuffer = await processImage(file.buffer);
      const uniqueName = `${uuidv4()}.webp`;
      const imageUrl = await uploadToAzure(uniqueName, processedBuffer);

      if (throwable.image_url) {
        await deleteFromAzure(throwable.image_url);
      }

      await this.throwableService.updateImageUrl(+id, imageUrl);

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
  async create(@UploadedFile() file: Express.Multer.File, @Body() throwableData: CreateThrowableDto) {
    let image_url = '';
    if (file) {
      const processedBuffer = await processImage(file.buffer);
      image_url = await uploadToAzure(file.filename, processedBuffer);
    }
    return this.throwableService.create({ ...throwableData, image_url });
  }

  @Get()
  findAll(): Promise<Throwable[]> {
    return this.throwableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Throwable> {
    return this.throwableService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/images',
        filename: (req, file, cb) => {
          const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, uniqueSuffix);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body()
    throwableData: {
      name: string;
      description: string;
      damage: number;
      penetration: number;
      outer_radius: number;
      fuse_time: number;
      traits: DeepPartial<Throwable['traits']>;
    },
  ) {
    let imageUrl: string;
    if (file) {
      imageUrl = `images/${file.filename}`;
      await this.throwableService.updateImageUrl(id, imageUrl);
    } else {
      const throwable = await this.throwableService.findOne(id);
      imageUrl = throwable.image_url;
    }
    return this.throwableService.update(id, {
      ...throwableData,
      image_url: imageUrl,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.throwableService.remove(id);
  }
}
