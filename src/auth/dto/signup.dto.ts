import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ description: 'User display name' })
  @IsNotEmpty()
  @IsString()
  displayName: string;

  @ApiProperty({ description: 'Unique username for the user' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'User email address' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @ApiProperty({
    description: 'User password with at least one letter, one number, and one special character',
    minLength: 10,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])/, {
    message: 'Password must include at least one letter, one number, and one special character',
  })
  password: string;

  @ApiProperty({ description: 'Turnstile token for verification' })
  @IsNotEmpty()
  @IsString()
  cfTurnstileToken: string;
}
