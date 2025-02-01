import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTraitDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
