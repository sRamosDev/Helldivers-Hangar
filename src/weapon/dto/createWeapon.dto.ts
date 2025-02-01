import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ArmorPenetration, WeaponCategory } from '../weapon.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWeaponDto {
  @ApiProperty({
    description: 'Name of the weapon',
    example: 'AK-47',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the weapon',
    example: 'A powerful assault rifle',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Type of weapon',
    example: 'Assault Rifle',
  })
  @IsString()
  type: string;

  @ApiProperty({
    description: 'Damage points',
    example: 75,
    minimum: 1,
  })
  @IsNumber()
  damage: number;

  @ApiProperty({
    description: 'Ammo capacity',
    example: 30,
    minimum: 1,
  })
  @IsNumber()
  capacity: number;

  @ApiProperty({
    description: 'Recoil level',
    example: 5,
    minimum: 1,
  })
  @IsNumber()
  recoil: number;

  @ApiProperty({
    description: 'Fire rate (shots per second)',
    example: 10,
    minimum: 1,
  })
  @IsNumber()
  fire_rate: number;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @ApiProperty({
    description: 'Category of the weapon',
    enum: WeaponCategory,
    example: WeaponCategory.PRIMARY,
  })
  @IsEnum(WeaponCategory)
  category: WeaponCategory;

  @ApiProperty({
    description: 'Maximum armor penetration level',
    enum: ArmorPenetration,
    example: ArmorPenetration.Medium,
  })
  @IsEnum(ArmorPenetration)
  max_penetration: ArmorPenetration;

  @ApiProperty({
    description: 'List of trait IDs associated with the weapon',
    type: [Number],
    example: [1, 2, 3],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  traits: number[];

  @ApiProperty({
    description: 'List of firing mode IDs associated with the weapon',
    type: [Number],
    example: [1, 2],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  firing_modes: number[];
}
