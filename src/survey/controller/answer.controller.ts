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
import { SurveyAnswerRequestSchema } from '../schemas/survey-answer-request.schema';

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
    schema: SurveyAnswerRequestSchema,
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
