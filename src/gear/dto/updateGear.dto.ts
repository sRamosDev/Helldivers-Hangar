import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateGearDto {
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
  armor_rating: number;

  @IsNumber()
  @IsOptional()
  speed: number;

  @IsNumber()
  @IsOptional()
  stamina_regen: number;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  passiveIds: number[];
}
