import { EnglishCpEntity } from '../entities/english_cp.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EnglishCreateDto {
  @ApiProperty({ type: Number, description: '영어 챕터의 idx', default: 1 })
  @IsNotEmpty()
  cpIdx: number;

  chapter?: EnglishCpEntity;

  @ApiProperty({
    type: String,
    description: '영어 챕터의 제목',
    default: 'chapter_1_title_$',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    description: '영어 챕터의 내용_한글',
    default: 'chapter_1_content_한글',
  })
  @IsNotEmpty()
  contentKr: string;

  @ApiProperty({
    type: String,
    description: '영어 챕터의 제목',
    default: 'chapter_1_description',
  })
  @IsString()
  explanation: string;

  @ApiProperty({
    type: String,
    description: '영어 챕터의 내용_영어',
    default: 'chapter_1_content_eng',
  })
  @IsNotEmpty()
  contentEn: string;
}
