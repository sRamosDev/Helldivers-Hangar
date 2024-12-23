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
import { SecondaryWeaponService } from './secondaryWeapon.service';
import { SecondaryWeapon } from './secondaryWeapon.entity';
import { Express } from 'express';
import { DeepPartial } from 'typeorm';

@Controller('secondary-weapon')
export class SecondaryWeaponController {
  constructor(
    private readonly secondaryWeaponService: SecondaryWeaponService,
  ) {}

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
    await this.secondaryWeaponService.updateImageUrl(id, imageUrl);
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
    secondaryWeaponData: {
      name: string;
      description: string;
      type: string;
      damage: number;
      capacity: number;
      recoil: number;
      fireRate: number;
      maxPenetration: DeepPartial<SecondaryWeapon['max_penetration']>;
    },
  ) {
    const imageUrl = `images/${file.filename}`;
    return this.secondaryWeaponService.create({
      ...secondaryWeaponData,
      imageUrl,
    });
  }

  @Get()
  async findAll() {
    return this.secondaryWeaponService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.secondaryWeaponService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body()
    secondaryWeaponData: {
      name: string;
      description: string;
      type: string;
      damage: number;
      capacity: number;
      recoil: number;
      fireRate: number;
      maxPenetration: DeepPartial<SecondaryWeapon['max_penetration']>;
    },
  ) {
    let imageUrl: string;
    if (file) {
      imageUrl = `images/${file.filename}`;
      await this.secondaryWeaponService.updateImageUrl(+id, imageUrl);
    } else {
      const secondaryWeapon = await this.secondaryWeaponService.findOne(+id);
      imageUrl = secondaryWeapon.image_url;
    }
    return this.secondaryWeaponService.update(+id, {
      ...secondaryWeaponData,
      imageUrl,
    });
  }
}
