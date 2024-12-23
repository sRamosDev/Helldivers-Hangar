import {
  Body,
  Controller,
  Delete,
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
import { ThrowableService } from './throwable.service';
import { Throwable } from './throwable.entity';
import { Express } from 'express';
import { DeepPartial } from 'typeorm';

@Controller('throwables')
export class ThrowableController {
  constructor(private readonly throwableService: ThrowableService) {}

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
    await this.throwableService.updateImageUrl(id, imageUrl);
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
    const imageUrl = `images/${file.filename}`;
    return this.throwableService.create({
      ...throwableData,
      image_url: imageUrl,
    });
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
