import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ArmorPenetration, WeaponCategory } from '../weapon.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateWeaponDto {
  @ApiPropertyOptional({
    description: 'Name of the weapon',
    example: 'AK-47',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional({
    description: 'Description of the weapon',
    example: 'A powerful assault rifle',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({
    description: 'Type of weapon',
    example: 'Assault Rifle',
  })
  @IsString()
  @IsOptional()
  type: string;

  @ApiPropertyOptional({
    description: 'Damage points',
    example: 75,
    minimum: 1,
  })
  @IsNumber()
  @IsOptional()
  damage: number;

  @ApiPropertyOptional({
    description: 'Ammo capacity',
    example: 30,
    minimum: 1,
  })
  @IsNumber()
  @IsOptional()
  capacity: number;

  @ApiPropertyOptional({
    description: 'Recoil level',
    example: 5,
    minimum: 1,
  })
  @IsNumber()
  @IsOptional()
  recoil: number;

  @ApiPropertyOptional({
    description: 'Fire rate (shots per second)',
    example: 10,
    minimum: 1,
  })
  @IsNumber()
  @IsOptional()
  fire_rate: number;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @ApiPropertyOptional({
    description: 'List of trait IDs associated with the weapon',
    type: [Number],
    example: [1, 2, 3],
  })
  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  traits: number[];

  @ApiPropertyOptional({
    description: 'List of firing mode IDs associated with the weapon',
    type: [Number],
    example: [1, 2],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  firing_modes: number[];

  @ApiPropertyOptional({
    description: 'Category of the weapon',
    enum: WeaponCategory,
    example: WeaponCategory.PRIMARY,
  })
  @IsEnum(WeaponCategory)
  @IsOptional()
  category: WeaponCategory;

  @ApiPropertyOptional({
    description: 'Maximum armor penetration level',
    enum: ArmorPenetration,
    example: ArmorPenetration.Medium,
  })
  @IsEnum(ArmorPenetration)
  @IsOptional()
  max_penetration: ArmorPenetration;
}
