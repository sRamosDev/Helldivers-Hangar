import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { GearCategory } from '../gear.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGearDto {
  @ApiProperty({ description: 'Name of the gear', required: false })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ description: 'Description of the gear', required: false })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'Type of the gear', required: false })
  @IsString()
  @IsOptional()
  type: string;

  @ApiProperty({ description: 'Armor rating of the gear', required: false })
  @IsNumber()
  @IsOptional()
  armor_rating: number;

  @ApiProperty({ description: 'Speed provided by the gear', required: false })
  @IsNumber()
  @IsOptional()
  speed: number;

  @ApiProperty({
    description: 'Stamina regeneration provided by the gear',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  stamina_regen: number;

  @ApiProperty({ description: 'Image URL of the gear', required: false })
  @IsString()
  @IsOptional()
  imageUrl: string;

  @ApiProperty({
    description: 'IDs of passive abilities associated with the gear',
    type: [Number],
    required: false,
  })
  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  passiveIds: number[];

  @ApiProperty({
    description: 'Category of the gear',
    enum: GearCategory,
    required: false,
  })
  @IsEnum(GearCategory)
  @IsOptional()
  category: GearCategory;
}
