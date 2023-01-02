import { Test, TestingModule } from '@nestjs/testing';
import { StudyEnglishController } from './study_english.controller';

describe('StudyEnglishController', () => {
  let controller: StudyEnglishController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudyEnglishController],
    }).compile();

    controller = module.get<StudyEnglishController>(StudyEnglishController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
