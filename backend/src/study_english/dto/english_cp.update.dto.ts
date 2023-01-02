import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class EnglishCpUpdateDto {
  @ApiProperty({
    type: String,
    description: '영어의 챕터 idx',
    default: 1,
  })
  @IsNotEmpty()
  enCpIdx: number;

  @ApiProperty({
    type: String,
    description: '영어의 챕터 이름',
    default: 'updateChapter',
  })
  @IsNotEmpty()
  chapter: string;

  @ApiProperty({
    type: Boolean,
    description: '영어의 공개 여부',
    default: true,
  })
  @Transform(({ value }) => value)
  @IsNotEmpty()
  isPublic = true;
}
