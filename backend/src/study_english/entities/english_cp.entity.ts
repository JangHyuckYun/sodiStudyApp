import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EnglishEntity } from './english.entity';
import { JoinColumn } from 'typeorm';

@Entity({ name: 'english_chapter' })
export class EnglishCpEntity {
  @PrimaryGeneratedColumn({
    name: 'english_chapter_id',
    comment: '영어 챕터 idx',
    type: 'bigint',
  })
  enCpIdx: number;

  @Column({
    name: 'english_chapter_number',
    comment: '영어 챕터',
  })
  chapter: string;

  @OneToMany(() => EnglishEntity, (en) => en.chapter, {
    lazy: true,
    cascade: true,
  })
  engList: EnglishEntity[];

  @Column({
    name: 'english_is_public',
    comment: '공개 챕터 여부',
    default: true,
  })
  isPublic: boolean;
}
