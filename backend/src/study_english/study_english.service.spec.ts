import { Test, TestingModule } from '@nestjs/testing';
import { StudyEnglishService } from './study_english.service';

describe('StudyEnglishService', () => {
  let service: StudyEnglishService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudyEnglishService],
    }).compile();

    service = module.get<StudyEnglishService>(StudyEnglishService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
