import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: 'john_helldiver' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'John Helldiver' })
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @ApiProperty({ example: 'john@helldivers.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(10)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])/, {
    message:
      'Password must include at least one letter, one number, and one special character',
  })
  password: string;

  @IsEnum(['user', 'admin'])
  role: string;
}