import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTraitDto {
  @ApiProperty({
    description: 'Name of the trait',
    example: 'Rapid Fire',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
