import { Repository } from 'typeorm';
import { CustomRepository } from '../../config/typeorm-ex.decorator';
import { EnglishCpEntity } from '../entities/english_cp.entity';
import { EnglishCpCreateDto } from '../dto/english_cp.create.dto';
import { EnglishCpUpdateDto } from '../dto/english_cp.update.dto';

@CustomRepository(EnglishCpEntity)
export class EnglishCpRepository extends Repository<EnglishCpEntity> {
  async createCp(englishCpCreateDto: EnglishCpCreateDto) {
    const cp = this.create({ ...englishCpCreateDto });

    await this.save(cp);
  }

  async updateCp(cpUpdateDto: EnglishCpUpdateDto) {
    const originalCp = await this.findByIdx(cpUpdateDto.enCpIdx);

    try {
      return await this.update(originalCp.enCpIdx, cpUpdateDto);
    } catch (e) {
      console.log('there is no Board having that id');
      throw e;
    }
  }

  async findByIdx(cpIdx: number, all = false) {
    return await this.findOneBy({ enCpIdx: cpIdx });
  }
}
