import { Controller, Post, Body } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { Survey } from './entities/survey.entity';
import { CreateSurveyDto } from './dtos/create-survey.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Survey')
@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @ApiOperation({ summary: '설문조사 생성' })
  @ApiResponse({
    status: 201,
    description: '설문조사가 생성되었습니다.',
    type: Survey,
  })
  @Post()
  createSurvey(@Body() createSurveyDto: CreateSurveyDto): Promise<Survey> {
    return this.surveyService.createSurvey(createSurveyDto);
  }
}
