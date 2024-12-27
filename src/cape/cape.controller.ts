import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { CapeService } from './cape.service';
import { Express } from 'express';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { ActivityLogService } from '../activity-log/activity-log.service';

@Controller('cape')
export class CapeController {
  constructor(
    private readonly capeService: CapeService,
    private readonly activityLogService: ActivityLogService,
  ) {}

  @Post('image/:id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
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
    @Req() req: any,
  ) {
    const imageUrl = `images/capes/${file.filename}`;
    await this.capeService.updateImageUrl(id, imageUrl);
    await this.activityLogService.logAction(
      req.user.id,
      `Uploaded image for cape with ID ${id}`,
    );
    return { filename: file.filename };
  }

  @Post()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
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
      armor_rating: number;
      speed: number;
      stamina_regen: number;
      passiveIds: number[];
    },
    @Req() req: any,
  ) {
    const imageUrl = `images/capes/${file.filename}`;
    const cape = await this.capeService.create({ ...capeData, imageUrl });
    await this.activityLogService.logAction(
      req.user.id,
      `Created cape with ID ${cape.id}`,
    );
    return cape;
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body()
    capeData: {
      name: string;
      description: string;
      type: string;
      armor_rating: number;
      speed: number;
      stamina_regen: number;
      passiveIds: number[];
    },
    @Req() req: any,
  ) {
    let imageUrl: string;
    if (file) {
      imageUrl = `images/capes/${file.filename}`;
      await this.capeService.updateImageUrl(+id, imageUrl);
    } else {
      const cape = await this.capeService.findOne(+id);
      imageUrl = cape.image_url;
    }
    const updatedCape = await this.capeService.update(+id, {
      ...capeData,
      imageUrl,
    });
    await this.activityLogService.logAction(
      req.user.id,
      `Updated cape with ID ${id}`,
    );
    return updatedCape;
  }
}
