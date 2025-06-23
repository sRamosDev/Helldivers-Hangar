import { BadRequestException } from '@nestjs/common';
import { multerConfig, processImage } from './image-upload.util';
import * as sharp from 'sharp';

// Mock sharp
jest.mock('sharp');
const mockSharp = sharp as jest.MockedFunction<typeof sharp>;

describe('Image Upload Util', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn(); // Mock console.log to suppress outputs
  });

  describe('multerConfig', () => {
    it('should be defined', () => {
      expect(multerConfig).toBeDefined();
      expect(multerConfig.storage).toBeDefined();
      expect(multerConfig.fileFilter).toBeDefined();
      expect(multerConfig.limits).toBeDefined();
    });

    it('should have correct file size limit', () => {
      expect(multerConfig.limits.fileSize).toBe(5 * 1024 * 1024); // 5MB
    });

    it('should use memory storage', () => {
      expect(multerConfig.storage).toBeTruthy();
    });

    describe('fileFilter', () => {
      const mockReq = {} as any;
      const mockCallback = jest.fn();

      beforeEach(() => {
        mockCallback.mockClear();
      });

      describe('Valid file types', () => {
        it('should accept JPEG files', () => {
          const file = {
            originalname: 'test.jpg',
            mimetype: 'image/jpeg'
          };

          multerConfig.fileFilter(mockReq, file, mockCallback);

          expect(mockCallback).toHaveBeenCalledWith(null, true);
        });

        it('should accept PNG files', () => {
          const file = {
            originalname: 'test.png',
            mimetype: 'image/png'
          };

          multerConfig.fileFilter(mockReq, file, mockCallback);

          expect(mockCallback).toHaveBeenCalledWith(null, true);
        });

        it('should accept WebP files', () => {
          const file = {
            originalname: 'test.webp',
            mimetype: 'image/webp'
          };

          multerConfig.fileFilter(mockReq, file, mockCallback);

          expect(mockCallback).toHaveBeenCalledWith(null, true);
        });

        it('should accept case-insensitive extensions', () => {
          const file = {
            originalname: 'test.JPG',
            mimetype: 'image/jpeg'
          };

          multerConfig.fileFilter(mockReq, file, mockCallback);

          expect(mockCallback).toHaveBeenCalledWith(null, true);
        });

        it('should accept .jpeg extension', () => {
          const file = {
            originalname: 'test.jpeg',
            mimetype: 'image/jpeg'
          };

          multerConfig.fileFilter(mockReq, file, mockCallback);

          expect(mockCallback).toHaveBeenCalledWith(null, true);
        });
      });

      describe('Invalid file types', () => {
        it('should reject invalid MIME types', () => {
          const file = {
            originalname: 'test.jpg',
            mimetype: 'image/gif'
          };

          multerConfig.fileFilter(mockReq, file, mockCallback);

          expect(mockCallback).toHaveBeenCalledWith(
            expect.any(BadRequestException),
            false
          );
          
          const error = mockCallback.mock.calls[0][0];
          expect(error.message).toBe('Invalid file type: image/gif');
        });

        it('should reject text files', () => {
          const file = {
            originalname: 'test.txt',
            mimetype: 'text/plain'
          };

          multerConfig.fileFilter(mockReq, file, mockCallback);

          expect(mockCallback).toHaveBeenCalledWith(
            expect.any(BadRequestException),
            false
          );
        });

        it('should reject PDF files', () => {
          const file = {
            originalname: 'test.pdf',
            mimetype: 'application/pdf'
          };

          multerConfig.fileFilter(mockReq, file, mockCallback);

          expect(mockCallback).toHaveBeenCalledWith(
            expect.any(BadRequestException),
            false
          );
        });

        it('should reject invalid file extensions', () => {
          const file = {
            originalname: 'test.gif',
            mimetype: 'image/jpeg' // Valid MIME but invalid extension
          };

          multerConfig.fileFilter(mockReq, file, mockCallback);

          expect(mockCallback).toHaveBeenCalledWith(
            expect.any(BadRequestException),
            false
          );
          
          const error = mockCallback.mock.calls[0][0];
          expect(error.message).toBe('Invalid file extension: .gif');
        });

        it('should reject files without extensions', () => {
          const file = {
            originalname: 'test',
            mimetype: 'image/jpeg'
          };

          multerConfig.fileFilter(mockReq, file, mockCallback);

          expect(mockCallback).toHaveBeenCalledWith(
            expect.any(BadRequestException),
            false
          );
          
          const error = mockCallback.mock.calls[0][0];
          expect(error.message).toBe('Invalid file extension: ');
        });

        it('should reject files with unknown extensions', () => {
          const file = {
            originalname: 'test.xyz',
            mimetype: 'image/jpeg'
          };

          multerConfig.fileFilter(mockReq, file, mockCallback);

          expect(mockCallback).toHaveBeenCalledWith(
            expect.any(BadRequestException),
            false
          );
        });
      });
    });
  });

  describe('processImage', () => {
    let mockSharpInstance: any;

    beforeEach(() => {
      mockSharpInstance = {
        resize: jest.fn().mockReturnThis(),
        webp: jest.fn().mockReturnThis(),
        toBuffer: jest.fn()
      };      
      mockSharp.mockReturnValue(mockSharpInstance as any);
    });

    it('should process image successfully', async () => {
      const inputBuffer = Buffer.from('test image data');
      const outputBuffer = Buffer.from('processed image data');
      
      mockSharpInstance.toBuffer.mockResolvedValue(outputBuffer);

      const result = await processImage(inputBuffer);

      expect(mockSharp).toHaveBeenCalledWith(inputBuffer);
      expect(mockSharpInstance.resize).toHaveBeenCalledWith(500, null, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      });
      expect(mockSharpInstance.webp).toHaveBeenCalledWith({
        quality: 80,
        lossless: false,
      });
      expect(mockSharpInstance.toBuffer).toHaveBeenCalled();
      expect(result).toEqual(outputBuffer);
      expect(console.log).toHaveBeenCalledWith('Image processed successfully');
    });

    it('should resize image to specified width', async () => {
      const inputBuffer = Buffer.from('test image data');
      const outputBuffer = Buffer.from('processed image data');
      
      mockSharpInstance.toBuffer.mockResolvedValue(outputBuffer);

      await processImage(inputBuffer);

      expect(mockSharpInstance.resize).toHaveBeenCalledWith(500, null, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      });
    });

    it('should maintain aspect ratio during resize', async () => {
      const inputBuffer = Buffer.from('test image data');
      const outputBuffer = Buffer.from('processed image data');
      
      mockSharpInstance.toBuffer.mockResolvedValue(outputBuffer);

      await processImage(inputBuffer);

      expect(mockSharpInstance.resize).toHaveBeenCalledWith(
        500,
        null, // height is null to maintain aspect ratio
        expect.objectContaining({
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        })
      );
    });

    it('should convert image to WebP format with correct quality', async () => {
      const inputBuffer = Buffer.from('test image data');
      const outputBuffer = Buffer.from('processed image data');
      
      mockSharpInstance.toBuffer.mockResolvedValue(outputBuffer);

      await processImage(inputBuffer);

      expect(mockSharpInstance.webp).toHaveBeenCalledWith({
        quality: 80,
        lossless: false,
      });
    });

    it('should not enlarge small images', async () => {
      const inputBuffer = Buffer.from('test image data');
      const outputBuffer = Buffer.from('processed image data');
      
      mockSharpInstance.toBuffer.mockResolvedValue(outputBuffer);

      await processImage(inputBuffer);

      expect(mockSharpInstance.resize).toHaveBeenCalledWith(
        500,
        null,
        expect.objectContaining({
          withoutEnlargement: true,
        })
      );
    });

    it('should throw BadRequestException on sharp error', async () => {
      const inputBuffer = Buffer.from('invalid image data');
      const errorMessage = 'Invalid image format';
      
      mockSharpInstance.toBuffer.mockRejectedValue(new Error(errorMessage));

      await expect(processImage(inputBuffer)).rejects.toThrow(
        new BadRequestException(errorMessage)
      );

      expect(mockSharp).toHaveBeenCalledWith(inputBuffer);
    });

    it('should throw BadRequestException with generic message on error without message', async () => {
      const inputBuffer = Buffer.from('invalid image data');
      
      mockSharpInstance.toBuffer.mockRejectedValue(new Error());

      await expect(processImage(inputBuffer)).rejects.toThrow(
        new BadRequestException('Error processing image')
      );
    });

    it('should throw BadRequestException on resize error', async () => {
      const inputBuffer = Buffer.from('invalid image data');
      
      mockSharpInstance.resize.mockImplementation(() => {
        throw new Error('Resize failed');
      });

      await expect(processImage(inputBuffer)).rejects.toThrow(
        new BadRequestException('Resize failed')
      );
    });

    it('should throw BadRequestException on webp conversion error', async () => {
      const inputBuffer = Buffer.from('invalid image data');
      
      mockSharpInstance.webp.mockImplementation(() => {
        throw new Error('WebP conversion failed');
      });

      await expect(processImage(inputBuffer)).rejects.toThrow(
        new BadRequestException('WebP conversion failed')
      );
    });

    it('should handle empty buffer', async () => {
      const inputBuffer = Buffer.alloc(0);
      
      mockSharpInstance.toBuffer.mockRejectedValue(new Error('Empty buffer'));

      await expect(processImage(inputBuffer)).rejects.toThrow(
        new BadRequestException('Empty buffer')
      );
    });

    it('should handle null error message', async () => {
      const inputBuffer = Buffer.from('invalid image data');
      
      mockSharpInstance.toBuffer.mockRejectedValue({ message: null });

      await expect(processImage(inputBuffer)).rejects.toThrow(
        new BadRequestException('Error processing image')
      );
    });

    it('should handle undefined error message', async () => {
      const inputBuffer = Buffer.from('invalid image data');
      
      mockSharpInstance.toBuffer.mockRejectedValue({});

      await expect(processImage(inputBuffer)).rejects.toThrow(
        new BadRequestException('Error processing image')
      );
    });
  });

  describe('Constants and Configuration', () => {
    it('should have correct maximum file size (5MB)', () => {
      expect(multerConfig.limits.fileSize).toBe(5 * 1024 * 1024);
    });

    it('should support correct MIME types', () => {
      const jpegFile = { originalname: 'test.jpg', mimetype: 'image/jpeg' };
      const pngFile = { originalname: 'test.png', mimetype: 'image/png' };
      const webpFile = { originalname: 'test.webp', mimetype: 'image/webp' };
      
      const mockCallback = jest.fn();
      
      multerConfig.fileFilter({} as any, jpegFile, mockCallback);
      expect(mockCallback).toHaveBeenCalledWith(null, true);
      
      mockCallback.mockClear();
      multerConfig.fileFilter({} as any, pngFile, mockCallback);
      expect(mockCallback).toHaveBeenCalledWith(null, true);
      
      mockCallback.mockClear();
      multerConfig.fileFilter({} as any, webpFile, mockCallback);
      expect(mockCallback).toHaveBeenCalledWith(null, true);
    });

    it('should use correct image processing parameters', async () => {
      const inputBuffer = Buffer.from('test image data');
      const outputBuffer = Buffer.from('processed image data');
      
      const mockSharpInstance = {
        resize: jest.fn().mockReturnThis(),
        webp: jest.fn().mockReturnThis(),
        toBuffer: jest.fn().mockResolvedValue(outputBuffer)
      };
        mockSharp.mockReturnValue(mockSharpInstance as any);

      await processImage(inputBuffer);

      // Check that correct width (500px) is used
      expect(mockSharpInstance.resize).toHaveBeenCalledWith(
        500,
        null,
        expect.any(Object)
      );

      // Check that correct WebP quality (80%) is used
      expect(mockSharpInstance.webp).toHaveBeenCalledWith({
        quality: 80,
        lossless: false,
      });
    });
  });
});
