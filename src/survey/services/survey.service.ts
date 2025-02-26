import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from '../entities/survey.entity';
import { Question } from '../entities/question.entity';
import { Option } from '../entities/option.entity';
import { Answer } from '../entities/answer.entity';
import { CreateSurveyDto } from '../dtos/create-survey.dto';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}
  private readonly logger = new Logger(SurveyService.name);

  // 설문 생성, 조회, 수정, 삭제 (CRUD)
  async createSurvey(createSurveyDto: CreateSurveyDto): Promise<Survey> {
    try {
      const survey = this.surveyRepository.create(createSurveyDto);
      const savedSurvey = await this.surveyRepository.save(survey);
      this.logger.log(`Survey created with id: ${savedSurvey.id}`);
      return savedSurvey;
    } catch (error) {
      this.logger.error('Error creating survey', (error as Error).stack);
      throw new InternalServerErrorException(
        '설문 저장 중 오류가 발생했습니다.',
      );
    }
  }
}
