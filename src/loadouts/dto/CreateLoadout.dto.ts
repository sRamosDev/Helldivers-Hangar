import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLoadoutDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  helmetId: number;

  @IsNumber()
  @IsNotEmpty()
  armorId: number;

  @IsNumber()
  @IsNotEmpty()
  capeId: number;

  @IsNumber()
  @IsNotEmpty()
  primaryWeaponId: number;

  @IsNumber()
  @IsNotEmpty()
  secondaryWeaponId: number;

  @IsNumber()
  @IsNotEmpty()
  throwableId: number;
}
