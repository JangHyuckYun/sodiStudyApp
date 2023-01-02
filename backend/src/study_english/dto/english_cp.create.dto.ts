import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EnglishCpCreateDto {
  @ApiProperty({ type: String, description: '영어의 챕터 이름', default: '' })
  @IsNotEmpty()
  chapter: string;
}
