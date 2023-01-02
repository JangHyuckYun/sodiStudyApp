import { Body, Controller, Delete, Post } from '@nestjs/common';
import { StudyEnglishService } from './study_english.service';
import { EnglishCpCreateDto } from './dto/english_cp.create.dto';
import { EnglishCreateDto } from './dto/english.create.dto';
import { EnglishCpUpdateDto } from './dto/english_cp.update.dto';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { EnglishUpdateDto } from './dto/english.update.dto';

@Controller('study/en')
export class StudyEnglishController {
  constructor(private readonly studyEnService: StudyEnglishService) {}

  @Post('create/cp')
  async createCp(@Body() createEnCpDto: EnglishCpCreateDto) {
    await this.studyEnService.createCp(createEnCpDto);
  }

  @ApiBody({ type: EnglishCpUpdateDto })
  @Post('update/cp')
  async updateCp(@Body() updateEnCpDto: EnglishCpUpdateDto) {
    await this.studyEnService.updateCp(updateEnCpDto);
  }

  @Post('list/cp')
  async findAllCp() {
    return await this.studyEnService.findAllByCp();
  }

  @Delete('update/cp')
  async deleteCp(@Body() delEnCpIdx: number) {
    await this.studyEnService.deleteCp(delEnCpIdx);
  }

  @Post('create')
  async createEn(@Body() createEnDto: EnglishCreateDto) {
    console.log('createEnDto', createEnDto);
    await this.studyEnService.createEn(createEnDto);
  }

  @ApiCreatedResponse({
    description: 'chapter 안의 영어 페이지 정보 업데이트',
    type: EnglishUpdateDto,
  })
  @Post('update')
  async updateEn(@Body() updateEnDto: EnglishUpdateDto) {
    await this.studyEnService.updateEn(updateEnDto);
  }

  @ApiCreatedResponse({
    description: '챕터 안의 모든 영어 페이지 반환',
    type: Number,
  })
  @Post('list')
  async findAllEnByChapterIdx(@Body() obj: { enCpIdx: number }) {
    return await this.studyEnService.findAllByEnByIdx(obj.enCpIdx);
  }

  @ApiCreatedResponse({
    description: '챕터 안의 특정 영어 페이지 삭제',
    type: Number,
  })
  @Delete('delete')
  async deleteEn(delEnIdx: number) {
    await this.studyEnService.deleteEn(delEnIdx);
  }
}
