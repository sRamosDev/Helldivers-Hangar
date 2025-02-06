import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { GearCategory } from '../gear.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateGearDto {
  @ApiPropertyOptional({ description: 'Name of the gear' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'Description of the gear' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Type of the gear' })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({ description: 'Armor rating of the gear' })
  @IsNumber()
  @IsOptional()
  armor_rating?: number;

  @ApiPropertyOptional({ description: 'Speed provided by the gear' })
  @IsNumber()
  @IsOptional()
  speed?: number;

  @ApiPropertyOptional({ description: 'Stamina regeneration provided by the gear' })
  @IsNumber()
  @IsOptional()
  stamina_regen?: number;

  @ApiPropertyOptional({ description: 'Image URL of the gear' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional({
    description: 'IDs of passive abilities associated with the gear',
    type: [Number],
  })
  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  passiveIds?: number[];

  @ApiPropertyOptional({
    description: 'Category of the gear',
    enum: GearCategory,
  })
  @IsEnum(GearCategory)
  @IsOptional()
  category?: GearCategory;
}
