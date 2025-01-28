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
import { WeaponService } from './weapon.service';
import { Weapon } from './weapon.entity';
import { Express } from 'express';
import { DeepPartial } from 'typeorm';

@Controller('weapon')
export class WeaponController {
  constructor(private readonly weaponService: WeaponService) {}

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
    await this.weaponService.updateImageUrl(id, imageUrl);
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
    weaponData: {
      name: string;
      description: string;
      category: DeepPartial<Weapon['category']>;
      type: string;
      damage: number;
      capacity: number;
      recoil: number;
      fireRate: number;
      maxPenetration: DeepPartial<Weapon['max_penetration']>;
    },
  ) {
    const imageUrl = `images/${file.filename}`;
    return this.weaponService.create({ ...weaponData, imageUrl });
  }

  @Get()
  async findAll() {
    return this.weaponService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.weaponService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body()
    weaponData: {
      name: string;
      description: string;
      category: DeepPartial<Weapon['category']>;
      type: string;
      damage: number;
      capacity: number;
      recoil: number;
      fireRate: number;
      maxPenetration: DeepPartial<Weapon['max_penetration']>;
    },
  ) {
    let imageUrl: string;
    if (file) {
      imageUrl = `images/${file.filename}`;
      await this.weaponService.updateImageUrl(+id, imageUrl);
    } else {
      const weapon = await this.weaponService.findOne(+id);
      imageUrl = weapon.image_url;
    }
    return this.weaponService.update(+id, {
      ...weaponData,
      imageUrl,
    });
  }
}
