import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @ApiProperty({
    type: String,
    description: '유저 이름 id',
    default: 'skg09203@naver.com',
  })
  @IsNotEmpty()
  @IsEmail()
  userId: string;

  @ApiProperty({ type: Number, description: '유저 이름 id', default: 1 })
  @IsNotEmpty()
  userPassword: string;

  @ApiProperty({ type: Number, description: '유저 이름 id', default: 1 })
  @IsNotEmpty()
  userName: string;

  @ApiProperty({ type: Number, description: '유저 이름 id', default: 1 })
  isActive: boolean;
}
