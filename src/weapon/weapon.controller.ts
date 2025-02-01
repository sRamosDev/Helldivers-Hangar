import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { WeaponService } from './weapon.service';
import { Express } from 'express';
import { multerConfig, processImage } from '../utils/image-upload.util';
import { unlink } from 'fs/promises';
import { CreateWeaponDto } from './dto/createWeapon.dto';
import { UpdateWeaponDto } from './dto/updateWeapon.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

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
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiOperation({
    summary: 'Upload weapon image',
    description: 'Upload an image for a specific weapon item',
  })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'Weapon ID', type: Number })
  @ApiResponse({ status: 200, description: 'Image uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({
    description: 'Image file',
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  async uploadWeaponImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    if (!file) throw new BadRequestException('No file uploaded');

    try {
      const weapon = await this.weaponService.findOne(+id);
      if (!weapon) {
        await unlink(file.path).catch(() => {});
        throw new BadRequestException('Weapon not found');
      }

      await processImage(file.path);
      const newImageUrl = `images/weapons/${file.filename.replace(/\.\w+$/, '.webp')}`;

      if (weapon.image_url) {
        const oldImagePath = join(process.cwd(), 'public', weapon.image_url);
        await unlink(oldImagePath).catch(() => {});
      }

      await this.weaponService.updateImageUrl(+id, newImageUrl);

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
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body()
    weaponData: CreateWeaponDto,
  ) {
    if (!file) throw new BadRequestException('No file uploaded');

    await processImage(file.path);

    const imageUrl = `images/weapons/${file.filename.replace(/\.\w+$/, '.webp')}`;
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
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body()
    weaponData: UpdateWeaponDto,
  ) {
    let imageUrl: string;

    if (file) {
      imageUrl = `images/${file.filename}`;
      await this.weaponService.updateImageUrl(+id, imageUrl);
      await processImage(file.path);
      imageUrl = `images/weapons/${file.filename.replace(/\.\w+$/, '.webp')}`;
    } else {
      const weapon = await this.weaponService.findOne(+id);
      imageUrl = weapon.image_url;
    }
    return this.weaponService.update(+id, { ...weaponData, imageUrl });
  }
}
