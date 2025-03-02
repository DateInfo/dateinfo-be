import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
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
}
