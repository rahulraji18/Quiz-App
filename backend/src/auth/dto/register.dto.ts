import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'Maximus',
    description: 'Name of the user',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'max@gmail.com',
    description: 'Email of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password@123',
    description: 'Password of account',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  password: string;
}
