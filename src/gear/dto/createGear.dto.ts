import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

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
}
