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
import { ArmorService } from './armor.service';
import { Express } from 'express';

@Controller('armor')
export class ArmorController {
  constructor(private readonly armorService: ArmorService) {}

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
    await this.armorService.updateImageUrl(id, imageUrl);
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
    armorData: {
      name: string;
      description: string;
      armor: number;
    },
  ) {
    const imageUrl = `images/${file.filename}`;
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
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body()
    armorData: {
      name: string;
      description: string;
      armor: number;
    },
  ) {
    let imageUrl: string;
    if (file) {
      imageUrl = `images/${file.filename}`;
      await this.armorService.updateImageUrl(+id, imageUrl);
    } else {
      const armor = await this.armorService.findOne(+id);
      imageUrl = armor.image_url;
    }
    return this.armorService.update(+id, { ...armorData, imageUrl });
  }
}
