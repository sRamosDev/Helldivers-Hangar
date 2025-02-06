import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { GearCategory } from '../gear.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGearDto {
  @ApiProperty({ description: 'Name of the gear' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the gear' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Type of the gear' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Armor rating of the gear' })
  @IsNumber()
  armor_rating: number;

  @ApiProperty({ description: 'Speed provided by the gear' })
  @IsNumber()
  speed: number;

  @ApiProperty({ description: 'Stamina regeneration provided by the gear' })
  @IsNumber()
  stamina_regen: number;

  @ApiProperty({ description: 'Image URL of the gear', required: false })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    description: 'IDs of passive abilities associated with the gear',
    type: [Number],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  passiveIds: number[];

  @ApiProperty({ description: 'Category of the gear', enum: GearCategory })
  @IsEnum(GearCategory)
  category: GearCategory;
}
