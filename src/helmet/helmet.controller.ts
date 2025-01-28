import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { HelmetService } from './helmet.service';
import { Express } from 'express';
import { multerConfig, processImage } from '../utils/image-upload.util';
import { unlink } from 'fs/promises';

@Controller('helmet')
export class HelmetController {
  constructor(private readonly helmetService: HelmetService) {}

  @Post('image/:id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadHelmetImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    if (!file) throw new BadRequestException('No file uploaded');

    try {
      const helmet = await this.helmetService.findOne(+id);
      if (!helmet) {
        await unlink(file.path).catch(() => {});
        throw new BadRequestException('Helmet not found');
      }

      await processImage(file.path);
      const newImageUrl = `images/helmets/${file.filename.replace(/\.\w+$/, '.webp')}`;

      if (helmet.image_url) {
        const oldImagePath = join(process.cwd(), 'public', helmet.image_url);
        await unlink(oldImagePath).catch(() => {});
      }

      await this.helmetService.updateImageUrl(+id, newImageUrl);

      return {
        success: true,
        imageUrl: newImageUrl,
      };
    } catch (error) {
      await Promise.allSettled([
        unlink(file.path).catch(() => {}),
        unlink(file.path.replace(/\.\w+$/, '.webp')).catch(() => {}),
      ]);

      throw new BadRequestException(
        error.message || 'Failed to process image upload',
      );
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body()
    helmetData: {
      name: string;
      description: string;
      type: string;
      armor_rating: number;
      speed: number;
      stamina_regen: number;
      passiveIds: number[];
    },
  ) {
    if (!file) throw new BadRequestException('No file uploaded');

    await processImage(file.path);

    const imageUrl = `images/helmets/${file.filename.replace(/\.\w+$/, '.webp')}`;
    return this.helmetService.create({ ...helmetData, imageUrl });
  }

  @Get()
  async findAll() {
    return this.helmetService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.helmetService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body()
    helmetData: {
      name: string;
      description: string;
      type: string;
      armor_rating: number;
      speed: number;
      stamina_regen: number;
      passiveIds: number[];
    },
  ) {
    let imageUrl: string;

    if (file) {
      await processImage(file.path);
      imageUrl = `images/helmets/${file.filename.replace(/\.\w+$/, '.webp')}`;
      // Delete old image here if needed
    } else {
      const helmet = await this.helmetService.findOne(+id);
      imageUrl = helmet.image_url;
    }

    return this.helmetService.update(+id, { ...helmetData, imageUrl });
  }
}
