import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLoadoutDto {
  @ApiProperty({
    description: 'Name of the loadout',
    example: 'Stealth Loadout',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'ID of the helmet',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  helmetId: number;

  @ApiProperty({
    description: 'ID of the armor',
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  armorId: number;

  @ApiProperty({
    description: 'ID of the cape',
    example: 3,
  })
  @IsNumber()
  @IsNotEmpty()
  capeId: number;

  @ApiProperty({
    description: 'ID of the primary weapon',
    example: 4,
  })
  @IsNumber()
  @IsNotEmpty()
  primaryWeaponId: number;

  @ApiProperty({
    description: 'ID of the secondary weapon',
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  secondaryWeaponId: number;

  @ApiProperty({
    description: 'ID of the throwable item',
    example: 6,
  })
  @IsNumber()
  @IsNotEmpty()
  throwableId: number;

  @ApiProperty({ description: 'Turnstile token for verification' })
  @IsNotEmpty()
  @IsString()
  cfTurnstileToken: string;
}
