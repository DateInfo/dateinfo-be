import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
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

  // 전체 설문조사 조회
  async findAllSurveys(): Promise<Survey[]> {
    try {
      const surveys = await this.surveyRepository.find({
        relations: ['questions', 'questions.options'], // 필요하면 관계도 미리 로드
        order: { createdAt: 'DESC' },
      });

      if (!surveys.length) {
        this.logger.warn('No surveys found');
      } else {
        this.logger.log(`Found ${surveys.length} surveys`);
      }

      return surveys;
    } catch (error) {
      this.logger.error('Error fetching all surveys', (error as Error).stack);
      throw new InternalServerErrorException(
        '전체 설문조사 조회 중 오류가 발생했습니다.',
      );
    }
  }

  // 단일 설문조사 조회
  async findSurveyById(id: number): Promise<Survey> {
    try {
      const survey = await this.surveyRepository.findOne({
        where: { id },
        relations: ['questions', 'questions.options'], // 필요하면 관계도 함께 로드
      });

      if (!survey) {
        this.logger.warn(`Survey with id ${id} not found`);
        throw new NotFoundException(`ID ${id}인 설문조사를 찾을 수 없습니다.`);
      }

      this.logger.log(`Survey found with id: ${id}`);
      return survey;
    } catch (error) {
      this.logger.error(
        `Error fetching survey with id ${id}`,
        (error as Error).stack,
      );
      throw new InternalServerErrorException(
        '설문조사 조회 중 오류가 발생했습니다.',
      );
    }
  }
}
