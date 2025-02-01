import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { WeaponCategory, ArmorPenetration } from '../weapon.entity';

export class CreateWeaponDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  type: string;

  @IsNumber()
  damage: number;

  @IsNumber()
  capacity: number;

  @IsNumber()
  recoil: number;

  @IsNumber()
  fire_rate: number;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsEnum(WeaponCategory)
  category: WeaponCategory;

  @IsEnum(ArmorPenetration)
  max_penetration: ArmorPenetration;

  @IsArray()
  @IsNumber({}, { each: true })
  traits: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  firing_modes: number[];
}
