import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import { BadRequestException } from '@nestjs/common';
import { unlink } from 'fs/promises';

// Configurable constants
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const UPLOAD_DIR = join(__dirname, '../../public/images'); // Absolute path
const PROCESSED_WIDTH = 500;
const WEBP_QUALITY = 80;

export const multerConfig = {
  storage: diskStorage({
    destination: UPLOAD_DIR,
    filename: (req: Request, file, cb) => {
      const fileExt = extname(file.originalname).toLowerCase();
      const uniqueName = `${uuidv4()}${fileExt}`;
      cb(null, uniqueName);
    },
  }),
  fileFilter: (req: Request, file, cb) => {
    const fileExt = extname(file.originalname).toLowerCase();

    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return cb(
        new BadRequestException(`Invalid file type: ${file.mimetype}`),
        false,
      );
    }

    if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
      return cb(
        new BadRequestException(`Invalid file extension: ${fileExt}`),
        false,
      );
    }

    cb(null, true);
  },
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
};

export async function processImage(filePath: string): Promise<void> {
  const outputFilePath = filePath.replace(/\.\w+$/, '.webp');

  try {
    await sharp(filePath)
      .resize(PROCESSED_WIDTH, null, {
        // Maintain aspect ratio
        fit: sharp.fit.inside,
        withoutEnlargement: true, // Don't enlarge smaller images
      })
      .webp({
        quality: WEBP_QUALITY,
        lossless: false,
      })
      .toFile(outputFilePath);

    // Delete original file after successful processing
    await unlink(filePath);
  } catch (error) {
    // Clean up both files if conversion failed
    await Promise.allSettled([
      unlink(filePath).catch(() => {}),
      unlink(outputFilePath).catch(() => {}),
    ]);
    throw new BadRequestException('Error processing image');
  }
}
