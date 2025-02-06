import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLoadoutDto {
  @ApiPropertyOptional({
    description: 'ID of the helmet',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  helmetId?: number;

  @ApiPropertyOptional({
    description: 'ID of the armor',
    example: 2,
  })
  @IsNumber()
  @IsOptional()
  armorId?: number;

  @ApiPropertyOptional({
    description: 'ID of the cape',
    example: 3,
  })
  @IsNumber()
  @IsOptional()
  capeId?: number;

  @ApiPropertyOptional({
    description: 'ID of the primary weapon',
    example: 4,
  })
  @IsNumber()
  @IsOptional()
  primaryWeaponId?: number;

  @ApiPropertyOptional({
    description: 'ID of the secondary weapon',
    example: 5,
  })
  @IsNumber()
  @IsOptional()
  secondaryWeaponId?: number;

  @ApiPropertyOptional({
    description: 'ID of the throwable item',
    example: 6,
  })
  @IsNumber()
  @IsOptional()
  throwableId?: number;
}
