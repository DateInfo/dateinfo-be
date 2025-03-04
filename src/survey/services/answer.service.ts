import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../entities/answer.entity';
import { Survey } from '../entities/survey.entity';
import { Question } from '../entities/question.entity';
import { Option } from '../entities/option.entity';
import { Member } from 'src/member/entity/member.entity';
import { CreateSurveyAnswerDto } from '../dtos/create-answer.dto';
import { getEntityOrThrow } from 'src/utils/entity.helper';

@Injectable()
export class AnswerService {
  private readonly logger = new Logger(AnswerService.name);

  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  /**
   * 설문 전체 응답을 DB에 저장 (한 번에 여러 개의 질문에 답변 저장)
   */
  async create(
    createSurveyAnswerDto: CreateSurveyAnswerDto,
  ): Promise<{ message: string; data: Answer[] }> {
    try {
      // 관련 엔티티 조회 (notFoundMessage 추가)
      const member = await getEntityOrThrow(
        this.memberRepository,
        { mbr_id: createSurveyAnswerDto.memberId },
        'Member not found',
      );
      const survey = await getEntityOrThrow(
        this.surveyRepository,
        { id: createSurveyAnswerDto.surveyId },
        'Survey not found',
      );

      // 답변 배열을 순회하면서 저장할 준비
      const answersToSave: Answer[] = [];

      for (const answerDto of createSurveyAnswerDto.answers) {
        const question = await getEntityOrThrow(
          this.questionRepository,
          { id: answerDto.questionId },
          'Question not found',
        );
        let selectedOption: Option | null = null;

        // ✅ 검증: 객관식과 단답형 중 하나만 있어야 함
        if (answerDto.selectedOptionId && answerDto.answerText) {
          throw new BadRequestException(
            '객관식 답변과 단답형 답변은 동시에 제출할 수 없습니다.',
          );
        }

        if (answerDto.selectedOptionId) {
          selectedOption = await getEntityOrThrow(
            this.optionRepository,
            { id: answerDto.selectedOptionId },
            'Option not found',
          );
        }

        // ✅ `new Answer()`를 사용하여 엔티티 인스턴스를 직접 생성
        const newAnswer = new Answer();
        newAnswer.member = member; // `mbr_id`가 해결됨
        newAnswer.survey = survey;
        newAnswer.question = question;
        newAnswer.selectedOption = selectedOption || null;
        newAnswer.answerText = answerDto.answerText || null;
        newAnswer.aiAnswer = ''; // 기본값 설정

        answersToSave.push(newAnswer);
      }

      // ✅ 한 번에 여러 개의 답변 저장
      const savedAnswers = await this.answerRepository.save(answersToSave);

      this.logger.log(
        `Survey answers submitted: ${JSON.stringify(savedAnswers)}`,
      );

      return {
        message: 'Survey answers submitted successfully',
        data: savedAnswers,
      };
    } catch (error) {
      this.logger.error(
        `Error saving survey answers: ${error instanceof Error ? error.message : 'Unknown error'}`,
        error instanceof Error ? error.stack : '',
      );
      throw new BadRequestException('Failed to save survey answers');
    }
  }

  async getAllAnswer(): Promise<Answer[]> {
    const allAnswer = await this.answerRepository.find({
      relations: ['member', 'survey', 'question', 'selectedOption'],
      order: { createdAt: 'DESC' },
    });

    this.logger.log(`✅ All Answers: ${JSON.stringify(allAnswer)}`);
    this.logger.log(`✅ Total Answers Count: ${allAnswer.length}`);

    return allAnswer;
  }

  async getAnswerById(answerId: number): Promise<Answer> {
    const answer = await getEntityOrThrow(
      this.answerRepository,
      { id: answerId },
      `Answer with ID ${answerId} not found`,
      ['member', 'survey', 'question', 'selectedOption'],
    );

    this.logger.log(`✅ Retrieved Answer: ${JSON.stringify(answer)}`);
    return answer;
  }
}
