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
import { GearService } from './gear.service';
import { Express } from 'express';
import { multerConfig, processImage } from '../utils/image-upload.util';
import { unlink } from 'fs/promises';
import { CreateGearDto } from './dto/createGear.dto';
import { UpdateGearDto } from './dto/updateGear.dto';

@Controller('gear')
export class GearController {
  constructor(private readonly gearService: GearService) {}

  @Post('image/:id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadGearImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    if (!file) throw new BadRequestException('No file uploaded');

    try {
      const gear = await this.gearService.findOne(+id);
      if (!gear) {
        await unlink(file.path).catch(() => {});
        throw new BadRequestException('Gear not found');
      }

      await processImage(file.path);
      const newImageUrl = `images/gears/${file.filename.replace(/\.\w+$/, '.webp')}`;

      if (gear.image_url) {
        const oldImagePath = join(process.cwd(), 'public', gear.image_url);
        await unlink(oldImagePath).catch(() => {});
      }

      await this.gearService.updateImageUrl(+id, newImageUrl);

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
    gearData: CreateGearDto,
  ) {
    if (!file) throw new BadRequestException('No file uploaded');

    await processImage(file.path);

    const imageUrl = `images/gears/${file.filename.replace(/\.\w+$/, '.webp')}`;
    return this.gearService.create({ ...gearData, imageUrl });
  }

  @Get()
  async findAll() {
    return this.gearService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.gearService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body()
    gearData: UpdateGearDto,
  ) {
    let imageUrl: string;

    if (file) {
      await processImage(file.path);
      imageUrl = `images/gears/${file.filename.replace(/\.\w+$/, '.webp')}`;
      // Delete old image here if needed
    } else {
      const gear = await this.gearService.findOne(+id);
      imageUrl = gear.image_url;
    }

    return this.gearService.update(+id, { ...gearData, imageUrl });
  }
}
