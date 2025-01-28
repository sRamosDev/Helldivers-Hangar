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
import { ArmorService } from './armor.service';
import { Express } from 'express';
import { multerConfig, processImage } from '../utils/image-upload.util';
import { unlink } from 'fs/promises';

@Controller('armor')
export class ArmorController {
  constructor(private readonly armorService: ArmorService) {}

  @Post('image/:id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadArmorImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    if (!file) throw new BadRequestException('No file uploaded');

    try {
      const armor = await this.armorService.findOne(+id);
      if (!armor) {
        await unlink(file.path).catch(() => {});
        throw new BadRequestException('Armor not found');
      }

      await processImage(file.path);
      const newImageUrl = `images/armors/${file.filename.replace(/\.\w+$/, '.webp')}`;

      if (armor.image_url) {
        const oldImagePath = join(process.cwd(), 'public', armor.image_url);
        await unlink(oldImagePath).catch(() => {});
      }

      await this.armorService.updateImageUrl(+id, newImageUrl);

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
    armorData: {
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

    const imageUrl = `images/armors/${file.filename.replace(/\.\w+$/, '.webp')}`;
    return this.armorService.create({ ...armorData, imageUrl });
  }

  @Get()
  async findAll() {
    return this.armorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.armorService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body()
    armorData: {
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
      imageUrl = `images/armors/${file.filename.replace(/\.\w+$/, '.webp')}`;
      // Delete old image here if needed
    } else {
      const helmet = await this.armorService.findOne(+id);
      imageUrl = helmet.image_url;
    }

    return this.armorService.update(+id, { ...armorData, imageUrl });
  }
}
