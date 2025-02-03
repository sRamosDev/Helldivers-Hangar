import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Helldiver' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  displayName: string;

  @ApiProperty({ example: 'jonhelldiver123' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message:
      'Username must only contain letters, numbers, dashes, and underscores',
  })
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({ example: 'john@helldiver.com' })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty({
    example: 'StrongPass123!',
    description: 'Must contain at least 10 characters, one letter, one number, and one special character'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(72)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])/, {
    message:
      'Password must include at least one letter, one number, and one special character',
  })
  password: string;
}
