import { Repository } from 'typeorm';
import { EnglishEntity } from '../entities/english.entity';
import { CustomRepository } from '../../config/typeorm-ex.decorator';
import { EnglishCreateDto } from '../dto/english.create.dto';
import { EnglishCpEntity } from '../entities/english_cp.entity';
import { EnglishCpUpdateDto } from '../dto/english_cp.update.dto';
import { EnglishUpdateDto } from '../dto/english.update.dto';

@CustomRepository(EnglishEntity)
export class EnglishRepository extends Repository<EnglishEntity> {
  async createEn(englishCreateDto: EnglishCreateDto) {
    const en = this.create({ ...englishCreateDto });
    await this.save(en);
  }

  async updateEn(enUpdateDto: EnglishUpdateDto) {
    const originalEn = await this.findByIdx(enUpdateDto.enIdx);

    try {
      delete enUpdateDto.cpIdx;
      return await this.update(originalEn.enIdx, enUpdateDto);
    } catch (e) {
      console.log('there is no English having that id');
      throw e;
    }
  }

  async findByIdx(enIdx: number, all = false) {
    return await this.findOneBy({ enIdx: enIdx });
  }
}
