import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { GearCategory } from '../gear.entity';

export class CreateGearDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  type: string;

  @IsNumber()
  armor_rating: number;

  @IsNumber()
  speed: number;

  @IsNumber()
  stamina_regen: number;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsArray()
  @IsNumber({}, { each: true })
  passiveIds: number[];

  @IsEnum(GearCategory)
  category: GearCategory;
}
