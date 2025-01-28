import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLoadoutDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  helmetId?: number;

  @IsNumber()
  @IsOptional()
  armorId?: number;

  @IsNumber()
  @IsOptional()
  capeId?: number;

  @IsNumber()
  @IsOptional()
  primaryWeaponId?: number;

  @IsNumber()
  @IsOptional()
  secondaryWeaponId?: number;

  @IsNumber()
  @IsOptional()
  throwableId?: number;
}
