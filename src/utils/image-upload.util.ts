import { memoryStorage } from 'multer';
import { extname } from 'path';
import * as sharp from 'sharp';
import { Request } from 'express';
import { BadRequestException } from '@nestjs/common';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const PROCESSED_WIDTH = 500;
const WEBP_QUALITY = 80;

export const multerConfig = {
  storage: memoryStorage(),
  fileFilter: (req: Request, file, cb) => {
    const fileExt = extname(file.originalname).toLowerCase();

    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return cb(new BadRequestException(`Invalid file type: ${file.mimetype}`), false);
    }

    if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
      return cb(new BadRequestException(`Invalid file extension: ${fileExt}`), false);
    }

    cb(null, true);
  },
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
};

export async function processImage(buffer: Buffer): Promise<Buffer> {
  try {
    const processedBuffer = await sharp(buffer)
      .resize(PROCESSED_WIDTH, null, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .webp({
        quality: WEBP_QUALITY,
        lossless: false,
      })
      .toBuffer();

    console.log('Image processed successfully');
    return processedBuffer;
  } catch (error) {
    throw new BadRequestException(error.message || 'Error processing image');
  }
}
