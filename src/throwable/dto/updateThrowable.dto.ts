import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateThrowableDto {
  @ApiPropertyOptional({
    description: 'Name of the throwable',
    example: 'G-12 High Explosive',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Description of the throwable',
    example: 'A high explosive grenade which damages lightly armored targets. Creates high damage over a small area when detonated.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Damage points',
    example: 800,
    minimum: 1,
  })
  @IsNumber()
  @IsOptional()
  damage?: number;

  @ApiPropertyOptional({
    description: 'Penetration level',
    example: 2,
    minimum: 1,
  })
  @IsNumber()
  @IsOptional()
  penetration?: number;

  @ApiPropertyOptional({
    description: 'Outer radius of the explosion',
    example: 5,
    minimum: 1,
  })
  @IsNumber()
  @IsOptional()
  outer_radius?: number;

  @ApiPropertyOptional({
    description: 'Fuse time in seconds',
    example: 3.5,
    minimum: 0.1,
  })
  @IsNumber()
  @IsOptional()
  fuse_time?: number;

  @ApiPropertyOptional({
    description: 'Image URL of the throwable',
    example: 'http://example.com/image.png',
  })
  @IsString()
  @IsOptional()
  image_url?: string;

  @ApiPropertyOptional({
    description: 'List of trait IDs associated with the throwable',
    type: [Number],
    example: [1, 2, 3],
  })
  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  traits?: number[];
}
