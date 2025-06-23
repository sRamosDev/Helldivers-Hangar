import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';
import { BlobServiceClient, ContainerClient, BlockBlobClient } from '@azure/storage-blob';
import { AzureStorageUtil } from './azure-storage.util';

// Mock the Azure Storage SDK
jest.mock('@azure/storage-blob');

describe('AzureStorageUtil', () => {
  let util: AzureStorageUtil;
  let configService: jest.Mocked<ConfigService>;
  let mockBlobServiceClient: jest.Mocked<BlobServiceClient>;
  let mockContainerClient: jest.Mocked<ContainerClient>;
  let mockBlockBlobClient: jest.Mocked<BlockBlobClient>;

  const mockConnectionString = 'DefaultEndpointsProtocol=https;AccountName=test;AccountKey=testkey==;EndpointSuffix=core.windows.net';
  const mockContainerName = 'test-container';

  beforeEach(async () => {
    // Create mock instances
    mockBlockBlobClient = {
      upload: jest.fn(),
      deleteIfExists: jest.fn(),
      url: 'https://test.blob.core.windows.net/test-container/test-file.png',
    } as any;

    mockContainerClient = {
      createIfNotExists: jest.fn().mockResolvedValue({}),
      getBlockBlobClient: jest.fn().mockReturnValue(mockBlockBlobClient),
    } as any;

    mockBlobServiceClient = {
      getContainerClient: jest.fn().mockReturnValue(mockContainerClient),
    } as any;

    // Mock the static method
    (BlobServiceClient.fromConnectionString as jest.Mock) = jest.fn().mockReturnValue(mockBlobServiceClient);

    // Create a properly mocked ConfigService
    const mockConfigService = {
      get: jest.fn().mockImplementation((key: string) => {
        if (key === 'AZURE_STORAGE_CONNECTION_STRING') return mockConnectionString;
        if (key === 'AZURE_STORAGE_CONTAINER') return mockContainerName;
        return undefined;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AzureStorageUtil,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    configService = module.get(ConfigService);
    
    // Mock console.error to avoid noise in test output
    jest.spyOn(console, 'error').mockImplementation(() => {});

    util = module.get<AzureStorageUtil>(AzureStorageUtil);

    // Reset all mocks after construction but not the ConfigService setup
    mockBlockBlobClient.upload.mockClear();
    mockBlockBlobClient.deleteIfExists.mockClear();
    mockContainerClient.createIfNotExists.mockClear();
    mockContainerClient.getBlockBlobClient.mockClear();
    mockBlobServiceClient.getContainerClient.mockClear();
    (BlobServiceClient.fromConnectionString as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });
  describe('constructor', () => {
    it('should initialize with connection string and container name', () => {
      // Since we cleared mocks, let's verify the service was constructed properly
      expect(util).toBeInstanceOf(AzureStorageUtil);
      expect(configService.get).toHaveBeenCalledWith('AZURE_STORAGE_CONNECTION_STRING');
      expect(configService.get).toHaveBeenCalledWith('AZURE_STORAGE_CONTAINER');
    });

    it('should throw error when connection string is missing', async () => {
      // Create a new ConfigService that returns undefined for connection string
      const badConfigService = {
        get: jest.fn().mockImplementation((key: string) => {
          if (key === 'AZURE_STORAGE_CONNECTION_STRING') return undefined;
          if (key === 'AZURE_STORAGE_CONTAINER') return mockContainerName;
          return undefined;
        }),
      };

      // Try to create a new module with bad config
      await expect(async () => {
        const badModule = await Test.createTestingModule({
          providers: [
            AzureStorageUtil,
            {
              provide: ConfigService,
              useValue: badConfigService,
            },
          ],
        }).compile();
        badModule.get<AzureStorageUtil>(AzureStorageUtil);
      }).rejects.toThrow('Azure Storage connection string not configured');
    });

    it('should initialize properly and be ready for use', async () => {
      // Wait for the async ensureContainerExists call to complete
      await new Promise(resolve => setTimeout(resolve, 0));
      
      // Verify the utility is properly initialized
      expect(util).toBeDefined();
      expect(util.uploadToAzure).toBeDefined();
      expect(util.deleteFromAzure).toBeDefined();
    });
  });

  describe('ensureContainerExists', () => {
    it('should create container if not exists', async () => {
      mockContainerClient.createIfNotExists.mockResolvedValue({} as any);

      // Access the private method through reflection for testing
      await (util as any).ensureContainerExists();

      expect(mockContainerClient.createIfNotExists).toHaveBeenCalledTimes(1);
    });

    it('should handle container creation errors', async () => {
      const error = new Error('Container creation failed');
      mockContainerClient.createIfNotExists.mockRejectedValue(error);

      await expect((util as any).ensureContainerExists()).rejects.toThrow('Failed to initialize Azure storage container');
      expect(console.error).toHaveBeenCalledWith('Error creating container:', error);
    });

    it('should log and throw error on container creation failure', async () => {
      const error = new Error('Network error');
      mockContainerClient.createIfNotExists.mockRejectedValue(error);

      await expect((util as any).ensureContainerExists()).rejects.toThrow('Failed to initialize Azure storage container');
      expect(console.error).toHaveBeenCalledWith('Error creating container:', error);
    });
  });

  describe('uploadToAzure', () => {
    const mockFilename = 'test-image.png';
    const mockBuffer = Buffer.from('test image data');

    beforeEach(() => {
      mockBlockBlobClient.upload.mockResolvedValue({} as any);
    });

    it('should upload file to Azure successfully', async () => {
      const result = await util.uploadToAzure(mockFilename, mockBuffer);

      expect(mockContainerClient.getBlockBlobClient).toHaveBeenCalledWith(mockFilename);
      expect(mockBlockBlobClient.upload).toHaveBeenCalledWith(mockBuffer, mockBuffer.length);
      expect(result).toBe(mockBlockBlobClient.url);
    });

    it('should return the correct blob URL after upload', async () => {
      const expectedUrl = 'https://test.blob.core.windows.net/test-container/test-image.png';
      
      // Create a new mock with the expected URL
      const mockBlobClientWithUrl = {
        ...mockBlockBlobClient,
        url: expectedUrl,
      } as any;
      
      mockContainerClient.getBlockBlobClient.mockReturnValue(mockBlobClientWithUrl);

      const result = await util.uploadToAzure(mockFilename, mockBuffer);

      expect(result).toBe(expectedUrl);
    });

    it('should handle upload failures and throw BadRequestException', async () => {
      const uploadError = new Error('Upload failed');
      mockBlockBlobClient.upload.mockRejectedValue(uploadError);

      await expect(util.uploadToAzure(mockFilename, mockBuffer)).rejects.toThrow(BadRequestException);
      expect(console.error).toHaveBeenCalledWith('Azure upload error:', uploadError);
    });

    it('should call upload with correct parameters', async () => {
      await util.uploadToAzure(mockFilename, mockBuffer);

      expect(mockBlockBlobClient.upload).toHaveBeenCalledWith(mockBuffer, mockBuffer.length);
    });

    it('should handle different file types', async () => {
      const pdfFilename = 'document.pdf';
      const pdfBuffer = Buffer.from('PDF content');

      await util.uploadToAzure(pdfFilename, pdfBuffer);

      expect(mockContainerClient.getBlockBlobClient).toHaveBeenCalledWith(pdfFilename);
      expect(mockBlockBlobClient.upload).toHaveBeenCalledWith(pdfBuffer, pdfBuffer.length);
    });

    it('should handle empty buffers', async () => {
      const emptyBuffer = Buffer.alloc(0);

      await util.uploadToAzure(mockFilename, emptyBuffer);

      expect(mockBlockBlobClient.upload).toHaveBeenCalledWith(emptyBuffer, 0);
    });

    it('should handle special characters in filename', async () => {
      const specialFilename = 'test file & image (1).png';

      await util.uploadToAzure(specialFilename, mockBuffer);

      expect(mockContainerClient.getBlockBlobClient).toHaveBeenCalledWith(specialFilename);
    });
  });

  describe('deleteFromAzure', () => {
    beforeEach(() => {
      mockBlockBlobClient.deleteIfExists.mockResolvedValue({} as any);
    });

    it('should delete file from Azure successfully', async () => {
      const testUrl = 'https://test.blob.core.windows.net/test-container/test-file.png';

      await util.deleteFromAzure(testUrl);

      expect(mockContainerClient.getBlockBlobClient).toHaveBeenCalledWith('test-file.png');
      expect(mockBlockBlobClient.deleteIfExists).toHaveBeenCalledTimes(1);
    });

    it('should extract blob name from URL correctly', async () => {
      const testUrl = 'https://storage.blob.core.windows.net/container/subfolder/image.jpg';

      await util.deleteFromAzure(testUrl);

      expect(mockContainerClient.getBlockBlobClient).toHaveBeenCalledWith('image.jpg');
    });

    it('should handle URLs with query parameters', async () => {
      const testUrl = 'https://test.blob.core.windows.net/container/file.png?sv=2020-08-04&ss=bfqt';

      await util.deleteFromAzure(testUrl);

      expect(mockContainerClient.getBlockBlobClient).toHaveBeenCalledWith('file.png?sv=2020-08-04&ss=bfqt');
    });

    it('should handle invalid URLs gracefully', async () => {
      const invalidUrl = 'not-a-valid-url';

      await util.deleteFromAzure(invalidUrl);

      expect(mockContainerClient.getBlockBlobClient).toHaveBeenCalledWith('not-a-valid-url');
    });

    it('should return early when blob name cannot be extracted', async () => {
      const emptyUrl = 'https://test.blob.core.windows.net/container/';

      await util.deleteFromAzure(emptyUrl);

      // Should return early and not call delete
      expect(mockContainerClient.getBlockBlobClient).not.toHaveBeenCalled();
      expect(mockBlockBlobClient.deleteIfExists).not.toHaveBeenCalled();
    });

    it('should handle deletion errors gracefully', async () => {
      const testUrl = 'https://test.blob.core.windows.net/test-container/test-file.png';
      const deletionError = new Error('Deletion failed');
      mockBlockBlobClient.deleteIfExists.mockRejectedValue(deletionError);

      // Should not throw error, just log it
      await expect(util.deleteFromAzure(testUrl)).resolves.toBeUndefined();
      expect(console.error).toHaveBeenCalledWith('Azure deletion error:', deletionError);
    });

    it('should handle empty string URL', async () => {
      await util.deleteFromAzure('');

      expect(mockContainerClient.getBlockBlobClient).not.toHaveBeenCalled();
      expect(mockBlockBlobClient.deleteIfExists).not.toHaveBeenCalled();
    });

    it('should handle null URL without throwing', async () => {
      await util.deleteFromAzure(null as any);

      expect(mockContainerClient.getBlockBlobClient).not.toHaveBeenCalled();
      expect(mockBlockBlobClient.deleteIfExists).not.toHaveBeenCalled();
    });

    it('should handle undefined URL without throwing', async () => {
      await util.deleteFromAzure(undefined as any);

      expect(mockContainerClient.getBlockBlobClient).not.toHaveBeenCalled();
      expect(mockBlockBlobClient.deleteIfExists).not.toHaveBeenCalled();
    });
  });

  describe('service structure', () => {
    it('should have all required methods defined', () => {
      expect(util.uploadToAzure).toBeDefined();
      expect(util.deleteFromAzure).toBeDefined();
      expect(typeof util.uploadToAzure).toBe('function');
      expect(typeof util.deleteFromAzure).toBe('function');
    });

    it('should be properly injectable', () => {
      expect(util).toBeDefined();
      expect(util).toBeInstanceOf(AzureStorageUtil);
    });

    it('should have proper dependency injection', () => {
      expect(configService).toBeDefined();
    });
  });
});
