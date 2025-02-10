import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { BadRequestException } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_STORAGE_CONTAINER;

if (!connectionString) {
  throw new Error('Azure Storage connection string not configured');
}

const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

// Create container if it doesn't exist (add this)
async function ensureContainerExists() {
  try {
    await containerClient.createIfNotExists();
  } catch (error) {
    console.error('Error creating container:', error);
    throw new Error('Failed to initialize Azure storage container');
  }
}

ensureContainerExists().catch(console.error);

export async function uploadToAzure(
  filename: string,
  buffer: Buffer,
): Promise<string> {
  try {
    const blockBlobClient: BlockBlobClient =
      containerClient.getBlockBlobClient(filename);
    await blockBlobClient.upload(buffer, buffer.length);
    return blockBlobClient.url;
  } catch (error) {
    console.error('Azure upload error:', error);
    throw new BadRequestException('Azure upload failed');
  }
}

export async function deleteFromAzure(imageUrl: string): Promise<void> {
  try {
    const blobName = imageUrl.split('/').pop();
    if (!blobName) return;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.deleteIfExists();
  } catch (error) {
    console.error('Azure deletion error:', error);
  }
}

export interface AzureStorageConfig {
  containerName: string;
  connectionString: string;
}
