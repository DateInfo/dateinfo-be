import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../entities/answer.entity';
import { Survey } from '../entities/survey.entity';
import { Question } from '../entities/question.entity';
import { Option } from '../entities/option.entity';
import { Member } from 'src/member/entity/member.entity';
import { CreateAnswerDto } from '../dtos/create-answer.dto';

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

  async createAnswer(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const { surveyId, questionId, selectedOptionId, answerText, memberId } =
      createAnswerDto;

    const survey = await this.surveyRepository.findOne({
      where: { id: surveyId },
    });
    if (!survey) {
      throw new NotFoundException('Survey not found');
    }

    const question = await this.questionRepository.findOne({
      where: { id: questionId },
    });
    if (!question) {
      throw new NotFoundException('Question not found');
    }

    let selectedOption: Option | null = null;
    if (selectedOptionId) {
      selectedOption = await this.optionRepository.findOne({
        where: { id: selectedOptionId },
      });
      if (!selectedOption) {
        throw new NotFoundException('Option not found');
      }
    }

    const member = await this.memberRepository.findOne({
      where: { mbr_id: memberId },
    });
    if (!member) {
      throw new NotFoundException('Member not found');
    }

    const answer = this.answerRepository.create({
      survey,
      question,
      selectedOption: selectedOption ?? undefined, // 만약 selectedOption이 null이면 undefined로 할당
      answerText,
      member,
    });

    return await this.answerRepository.save(answer);
  }
}
