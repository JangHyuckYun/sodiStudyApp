import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EnglishCpEntity } from './english_cp.entity';

@Entity({ name: 'english' })
export class EnglishEntity {
  @PrimaryGeneratedColumn({
    name: 'english_id',
    comment: '영어 idx',
    type: 'bigint',
  })
  enIdx: number;

  @ManyToOne(() => EnglishCpEntity, (enCp) => enCp.engList, { eager: true })
  @JoinColumn({
    name: 'chapter_id',
  })
  chapter: EnglishCpEntity;

  @Column({
    name: 'english_title',
    comment: '영어 페이지 제목',
    nullable: false,
  })
  title: string;

  @Column({
    name: 'english_content_kr',
    comment: '영어 페이지 내용 - 한국어',
    nullable: false,
  })
  contentKr: string;

  @Column({
    name: 'english_content_en',
    comment: '영어 페이지 내용 - 영어',
  })
  contentEn: string;

  @Column({
    name: 'english_explanation',
    comment: '영어 페이지 설명',
    nullable: false,
  })
  explanation: string;
}
