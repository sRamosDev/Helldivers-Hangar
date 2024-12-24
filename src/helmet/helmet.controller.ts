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
import { HelmetService } from './helmet.service';
import { Express } from 'express';

@Controller('helmet')
export class HelmetController {
  constructor(private readonly helmetService: HelmetService) {}

  @Post('image/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/images/hemlets',
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
    const imageUrl = `images/hemlets/${file.filename}`;
    await this.helmetService.updateImageUrl(id, imageUrl);
    return { filename: file.filename };
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/images/hemlets',
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
    const imageUrl = `images/hemlets/${file.filename}`;
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
      imageUrl = `images/hemlets/${file.filename}`;
      await this.helmetService.updateImageUrl(+id, imageUrl);
    } else {
      const helmet = await this.helmetService.findOne(+id);
      imageUrl = helmet.image_url;
    }
    return this.helmetService.update(+id, { ...helmetData, imageUrl });
  }
}
