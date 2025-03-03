import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AnswerService } from '../services/answer.service';
import { CreateAnswerDto } from '../dtos/create-answer.dto';
import { Answer } from '../entities/answer.entity';

@ApiTags('Answer')
@Controller('Answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @ApiOperation({ summary: '설문조사 답변 생성' })
  @ApiResponse({
    status: 201,
    description: '설문조사 답변이 생성되었습니다.',
    type: Answer,
  })
  @Post()
  createAnswer(@Body() createAnswerDto: CreateAnswerDto): Promise<Answer> {
    return this.answerService.createAnswer(createAnswerDto);
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
