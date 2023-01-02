import { Module } from '@nestjs/common';
import { StudyEnglishController } from './study_english.controller';
import { StudyEnglishService } from './study_english.service';
import { TypeOrmExModule } from '../config/typeorm-ex.module';
import { EnglishRepository } from './repository/english.repository';
import { EnglishCpRepository } from './repository/english_cp.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnglishEntity } from './entities/english.entity';
import { EnglishCpEntity } from './entities/english_cp.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EnglishEntity, EnglishCpEntity]),
    TypeOrmExModule.forCustomRepository([
      EnglishRepository,
      EnglishCpRepository,
    ]),
  ],
  controllers: [StudyEnglishController],
  providers: [StudyEnglishService],
})
export class StudyEnglishModule {}
