import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AzureStorageUtil {
  private blobServiceClient: BlobServiceClient;
  private containerClient;

  constructor(private configService: ConfigService) {
    const connectionString = this.configService.get<string>('AZURE_STORAGE_CONNECTION_STRING');
    const containerName = this.configService.get<string>('AZURE_STORAGE_CONTAINER');
    if (!connectionString) {
      throw new Error('Azure Storage connection string not configured');
    }
    if (!containerName) {
      throw new Error('Azure Storage container name not configured');
    }
    this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    this.containerClient = this.blobServiceClient.getContainerClient(containerName);
    this.ensureContainerExists().catch(console.error);
  }

  private async ensureContainerExists() {
    try {
      await this.containerClient.createIfNotExists();
    } catch (error) {
      console.error('Error creating container:', error);
      throw new Error('Failed to initialize Azure storage container');
    }
  }

  async uploadToAzure(filename: string, buffer: Buffer): Promise<string> {
    try {
      const blockBlobClient: BlockBlobClient = this.containerClient.getBlockBlobClient(filename);
      await blockBlobClient.upload(buffer, buffer.length);
      return blockBlobClient.url;
    } catch (error) {
      console.error('Azure upload error:', error);
      throw new BadRequestException('Azure upload failed');
    }
  }

  async deleteFromAzure(imageUrl: string): Promise<void> {
    try {
      const blobName = imageUrl.split('/').pop();
      if (!blobName) return;
      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
      await blockBlobClient.deleteIfExists();
    } catch (error) {
      console.error('Azure deletion error:', error);
    }
  }
}

export interface AzureStorageConfig {
  containerName: string;
  connectionString: string;
}
