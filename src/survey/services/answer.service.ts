import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../entities/answer.entity';
import { Survey } from '../entities/survey.entity';
import { Question } from '../entities/question.entity';
import { Option } from '../entities/option.entity';
import { Member } from 'src/member/entity/member.entity';
import { CreateAnswerDto } from '../dtos/create-answer.dto';
import { getEntityOrThrow } from 'src/utils/entity.helper';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Option)
    private optionRepository: Repository<Option>,
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}
  private readonly logger = new Logger(AnswerService.name);

  async createAnswer(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const { surveyId, questionId, selectedOptionId, answerText, memberId } =
      createAnswerDto;

    const survey = await getEntityOrThrow(
      this.surveyRepository,
      { id: surveyId },
      'Survey not found',
    );

    const question = await getEntityOrThrow(
      this.questionRepository,
      { id: questionId },
      'Question not found',
    );

    let selectedOption: Option | null = null;
    if (selectedOptionId) {
      selectedOption = await getEntityOrThrow(
        this.optionRepository,
        { id: selectedOptionId },
        'Option not found',
      );
    }

    const member = await getEntityOrThrow<Member>(
      this.memberRepository,
      // 제네릭 + 외부 라이브러리(TypeORM) + NestJS 조합에서 eslint가 타입 추론 실패
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      { mbr_id: memberId },
      'Member not found',
    );

    const answer = this.answerRepository.create({
      survey,
      question,
      selectedOption: selectedOption ?? undefined, // 만약 selectedOption이 null이면 undefined로 할당
      answerText,
      member,
    });

    const savedAnswer = await this.answerRepository.save(answer);

    this.logger.log(`✅ Full Saved Answer: ${JSON.stringify(savedAnswer)}`);
    this.logger.log(`✅ Survey created with id: ${savedAnswer.id}`);

    return savedAnswer;
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
}
