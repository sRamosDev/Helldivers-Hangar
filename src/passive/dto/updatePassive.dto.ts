import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePassiveDto {
  @ApiPropertyOptional({
    description: 'Updated name of the passive ability',
    example: 'Enhanced Stealth',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Updated description of the passive ability',
    example: 'Improves stealth even further in low light conditions.',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
