import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AnswerService } from '../services/answer.service';
import { CreateSurveyAnswerDto } from '../dtos/create-answer.dto';
import { Answer } from '../entities/answer.entity';

@ApiTags('Answer')
@Controller('Answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  /**
   * 설문 답변 제출 API
   * @param createSurveyAnswerDto - 설문 답변 DTO
   */
  @Post()
  @ApiOperation({
    summary: '설문 응답 저장',
    description:
      '한 번의 요청으로 연애 성향 및 스타일 설문에 대한 모든 답변을 저장합니다.',
  })
  @ApiBody({
    description: '연애 성향 및 스타일 설문 응답 예시',
    examples: {
      example: {
        summary: '설문 응답 예제',
        value: {
          memberId: 18,
          surveyId: 5,
          answers: [
            { questionId: 32, selectedOptionId: 64 },
            { questionId: 33, selectedOptionId: 68 },
            { questionId: 34, selectedOptionId: 70 },
            { questionId: 35, selectedOptionId: 74 },
            { questionId: 36, selectedOptionId: 78 },
            { questionId: 38, selectedOptionId: 81 },
            { questionId: 39, selectedOptionId: 85 },
            { questionId: 40, selectedOptionId: 89 },
            { questionId: 41, selectedOptionId: 92 },
            { questionId: 42, selectedOptionId: 95 },
            { questionId: 43, selectedOptionId: 99 },
            { questionId: 45, selectedOptionId: 103 },
            { questionId: 48, selectedOptionId: 106 },
            {
              questionId: 31,
              answerText: 'MBTI가 성격을 설명하는 데 도움이 됩니다.',
            },
            {
              questionId: 47,
              answerText:
                'MBTI 차이로 갈등이 생길 수도 있지만, 서로 배울 점도 많아요.',
            },
            {
              questionId: 46,
              answerText:
                '제 MBTI가 감성적이라 연애할 때 상대의 감정을 많이 배려해요.',
            },
            {
              questionId: 37,
              answerText: '서로의 강점을 살려 역할을 나누면 좋겠어요.',
            },
            { questionId: 30, answerText: 'INFJ' },
            { questionId: 44, answerText: '안정감과 자기 성장' },
            {
              questionId: 49,
              answerText: '상대방의 MBTI가 저와 상호 보완적이길 원해요.',
            },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: '설문 답변이 성공적으로 저장됨',
  })
  async submitAnswers(@Body() createSurveyAnswerDto: CreateSurveyAnswerDto) {
    return this.answerService.create(createSurveyAnswerDto);
  }

  @ApiOperation({ summary: '설문조사 답변 전체 조회' })
  @ApiResponse({
    status: 201,
    description: '설문조사 답변이 전체 조회가 되었습니다.',
    type: Answer,
  })
  @Get()
  getAllAnswers(): Promise<Answer[]> {
    return this.answerService.getAllAnswer();
  }

  @ApiOperation({ summary: '설문조사 단일 답변 조회' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '조회할 설문조사 답변의 ID',
  })
  @ApiResponse({
    status: 200,
    description: '설문조사 단일 답변 조회 성공',
    type: Answer,
  })
  @ApiResponse({
    status: 404,
    description: '해당 ID의 답변을 찾을 수 없습니다.',
  })
  @Get(':id')
  async getAnswerById(@Param('id') id: string): Promise<Answer> {
    return await this.answerService.getAnswerById(Number(id));
  }
}
