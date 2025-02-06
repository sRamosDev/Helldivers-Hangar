import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateFiringModeDto {
  @ApiPropertyOptional({
    description: 'Updated name of the firing mode',
    example: 'Burst Fire',
  })
  @IsString()
  @IsOptional()
  name?: string;
}
