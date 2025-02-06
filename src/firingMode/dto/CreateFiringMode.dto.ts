import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFiringModeDto {
  @ApiProperty({
    description: 'Name of the firing mode',
    example: 'Single Shot',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
