import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateThrowableDto {
  @ApiProperty({
    description: 'Name of the throwable',
    example: 'G-12 High Explosive',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the throwable',
    example: 'A high explosive grenade which damages lightly armored targets. Creates high damage over a small area when detonated.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Damage points',
    example: 800,
    minimum: 1,
  })
  @IsNumber()
  damage: number;

  @ApiProperty({
    description: 'Penetration level',
    example: 2,
    minimum: 1,
  })
  @IsNumber()
  penetration: number;

  @ApiProperty({
    description: 'Outer radius of the explosion',
    example: 5,
    minimum: 1,
  })
  @IsNumber()
  outer_radius: number;

  @ApiProperty({
    description: 'Fuse time in seconds',
    example: 3.5,
    minimum: 0.1,
  })
  @IsNumber()
  fuse_time: number;

  @ApiPropertyOptional({
    description: 'Image URL of the throwable',
    example: 'http://example.com/image.png',
  })
  @IsString()
  @IsOptional()
  image_url?: string;

  @ApiProperty({
    description: 'List of trait IDs associated with the throwable',
    type: [Number],
    example: [1, 2, 3],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  traits: number[];
}
