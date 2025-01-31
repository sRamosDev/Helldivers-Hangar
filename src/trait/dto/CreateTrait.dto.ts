import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTraitDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
