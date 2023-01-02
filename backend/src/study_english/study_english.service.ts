import { Injectable } from '@nestjs/common';
import { EnglishRepository } from './repository/english.repository';
import { EnglishCpRepository } from './repository/english_cp.repository';
import { EnglishCpCreateDto } from './dto/english_cp.create.dto';
import { EnglishCreateDto } from './dto/english.create.dto';
import { EnglishCpEntity } from './entities/english_cp.entity';
import { EnglishCpUpdateDto } from './dto/english_cp.update.dto';
import { EnglishUpdateDto } from './dto/english.update.dto';

@Injectable()
export class StudyEnglishService {
  constructor(
    private readonly enRepository: EnglishRepository,
    private readonly enCpRepository: EnglishCpRepository,
  ) {}

  async createCp(cpCreateDto: EnglishCpCreateDto) {
    await this.enCpRepository.createCp(cpCreateDto);
  }

  async updateCp(cpUpdateDto: EnglishCpUpdateDto) {
    await this.enCpRepository.updateCp(cpUpdateDto);
  }

  async createEn(englishCreateDto: EnglishCreateDto) {
    const cp: EnglishCpEntity = await this.enCpRepository.findByIdx(
      englishCreateDto.cpIdx,
    );
    englishCreateDto.chapter = cp;
    await this.enRepository.createEn(englishCreateDto);
  }

  async deleteCp(delEnCpIdx: number) {
    await this.enRepository.delete(delEnCpIdx);
  }

  async findAllByCp() {
    return await this.enCpRepository.find();
  }

  async updateEn(updateEnDto: EnglishUpdateDto) {
    return await this.enRepository.updateEn(updateEnDto);
  }

  async findAllByEnByIdx(enCpIdx: number) {
    return await this.enRepository
      .createQueryBuilder('english')
      .select()
      .where('english.chapter = :enCpIdx', { enCpIdx })
      .getMany();
  }

  async deleteEn(delEnIdx: number) {
    return await this.enRepository.delete(delEnIdx);
  }
}
