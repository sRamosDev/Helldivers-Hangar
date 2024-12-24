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
import { CapeService } from './cape.service';
import { Express } from 'express';

@Controller('cape')
export class CapeController {
  constructor(private readonly capeService: CapeService) {}

  @Post('image/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/images/capes',
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
    const imageUrl = `images/capes/${file.filename}`;
    await this.capeService.updateImageUrl(id, imageUrl);
    return { filename: file.filename };
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/images/capes/',
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
    capeData: {
      name: string;
      description: string;
      type: string;
      cape_rating: number;
      speed: number;
      stamina_regen: number;
      passiveIds: number[];
    },
  ) {
    const imageUrl = `images/capes/${file.filename}`;
    return this.capeService.create({ ...capeData, imageUrl });
  }

  @Get()
  async findAll() {
    return this.capeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.capeService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body()
    capeData: {
      name: string;
      description: string;
      type: string;
      cape_rating: number;
      speed: number;
      stamina_regen: number;
      passiveIds: number[];
    },
  ) {
    let imageUrl: string;
    if (file) {
      imageUrl = `images/capes/${file.filename}`;
      await this.capeService.updateImageUrl(+id, imageUrl);
    } else {
      const cape = await this.capeService.findOne(+id);
      imageUrl = cape.image_url;
    }
    return this.capeService.update(+id, { ...capeData, imageUrl });
  }
}
