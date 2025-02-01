import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ArmorPenetration, WeaponCategory } from '../weapon.entity';

export class UpdateWeaponDto {
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
  damage: number;

  @IsNumber()
  @IsOptional()
  capacity: number;

  @IsNumber()
  @IsOptional()
  recoil: number;

  @IsNumber()
  @IsOptional()
  fire_rate: number;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  traits: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  firing_modes: number[];

  @IsEnum(WeaponCategory)
  @IsOptional()
  category: WeaponCategory;

  @IsEnum(ArmorPenetration)
  @IsOptional()
  max_penetration: ArmorPenetration;
}
