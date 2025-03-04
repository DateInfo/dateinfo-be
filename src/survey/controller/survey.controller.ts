import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SurveyService } from '../services/survey.service';
import { Survey } from '../entities/survey.entity';
import { CreateSurveyDto } from '../dtos/create-survey.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { SurveyRequestSchema } from '../schemas/survey-request.schema';

@ApiTags('Survey')
@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @ApiOperation({ summary: '설문조사 생성' })
  @ApiBody({
    description: '설문조사 생성 요청 데이터',
    schema: SurveyRequestSchema,
  })
  @ApiResponse({
    status: 201,
    description: '설문조사가 성공적으로 생성되었습니다.',
    type: Survey,
  })
  @ApiResponse({
    status: 500,
    description: '서버 오류로 인해 설문조사 생성에 실패했습니다.',
  })
  @Post()
  createSurvey(@Body() createSurveyDto: CreateSurveyDto): Promise<Survey> {
    return this.surveyService.createSurvey(createSurveyDto);
  }

  @ApiOperation({ summary: '전체 설문조사 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '설문조사 목록 조회 성공',
    type: [Survey],
  })
  @ApiResponse({
    status: 500,
    description: '서버 오류로 인해 설문조사 목록 조회에 실패했습니다.',
  })
  @Get()
  async getAllSurveys(): Promise<Survey[]> {
    return this.surveyService.findAllSurveys();
  }

  @ApiOperation({ summary: '설문조사 단일 조회' })
  @ApiParam({
    name: 'id',
    description: '조회할 설문조사의 ID',
    example: 5,
  })
  @ApiResponse({
    status: 200,
    description: '설문조사 조회 성공',
    type: Survey,
  })
  @ApiResponse({
    status: 404,
    description: '해당 ID의 설문조사를 찾을 수 없습니다.',
  })
  @ApiResponse({
    status: 500,
    description: '서버 오류로 인해 설문조사 조회에 실패했습니다.',
  })
  @Get(':id')
  async getSurveyById(@Param('id', ParseIntPipe) id: number): Promise<Survey> {
    return this.surveyService.findSurveyById(id);
  }
}
