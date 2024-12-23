import {
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
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { PrimaryWeaponService } from './primaryWeapon.service';
import { PrimaryWeapon } from './primaryWeapon.entity';
import { Express } from 'express';
import { DeepPartial } from 'typeorm';

@Controller('primary-weapon')
export class PrimaryWeaponController {
  constructor(private readonly primaryWeaponService: PrimaryWeaponService) {}

  @Post('image/:id')
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
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    const imageUrl = `images/${file.filename}`;
    await this.primaryWeaponService.updateImageUrl(id, imageUrl);
    return { filename: file.filename };
  }

  @Post()
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
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body()
    primaryWeaponData: {
      name: string;
      description: string;
      type: string;
      damage: number;
      capacity: number;
      recoil: number;
      fireRate: number;
      maxPenetration: DeepPartial<PrimaryWeapon['max_penetration']>;
    },
  ) {
    const imageUrl = `images/${file.filename}`;
    return this.primaryWeaponService.create({ ...primaryWeaponData, imageUrl });
  }

  @Get()
  async findAll() {
    return this.primaryWeaponService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.primaryWeaponService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body()
    primaryWeaponData: {
      name: string;
      description: string;
      type: string;
      damage: number;
      capacity: number;
      recoil: number;
      fireRate: number;
      maxPenetration: DeepPartial<PrimaryWeapon['max_penetration']>;
    },
  ) {
    let imageUrl: string;
    if (file) {
      imageUrl = `images/${file.filename}`;
      await this.primaryWeaponService.updateImageUrl(+id, imageUrl);
    } else {
      const primaryWeapon = await this.primaryWeaponService.findOne(+id);
      imageUrl = primaryWeapon.image_url;
    }
    return this.primaryWeaponService.update(+id, {
      ...primaryWeaponData,
      imageUrl,
    });
  }
}
