import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePassiveDto {
  @ApiProperty({
    description: 'Name of the passive ability',
    example: 'Stealth',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the passive ability',
    example: 'Provides enhanced stealth capabilities in dark areas.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
