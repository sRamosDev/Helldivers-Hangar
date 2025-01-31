import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { GearCategory } from '../gear.entity';

export class UpdateGearDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsNumber()
  @IsOptional()
  armor_rating: number;

  @IsNumber()
  @IsOptional()
  speed: number;

  @IsNumber()
  @IsOptional()
  stamina_regen: number;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  passiveIds: number[];

  @IsEnum(GearCategory)
  @IsOptional()
  category: GearCategory;
}
