import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateQuestionDto } from './create-question.dto';
import { Type } from 'class-transformer';

export class CreateSurveyDto {
  @ApiProperty({
    description: '설문조사의 제목',
    example: '연애 설문조사',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: '설문조사의 상세 설명',
    example: '연애에 관한 여러 질문을 포함한 설문조사입니다.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: '설문에 포함된 질문 목록',
    example: [
      {
        questionText: '당신의 성별은?',
        questionType: 'multiple-choice',
        options: [{ optionText: '남자' }, { optionText: '여자' }],
      },
      {
        questionText: '당신의 mbti는?',
        questionType: 'short-answer',
      },
      {
        questionText: '당신은 연애의 빈도는?',
        questionType: 'multiple-choice',
        options: [
          { optionText: '많이' },
          { optionText: '적당히' },
          { optionText: '조금' },
          { optionText: '없음' },
        ],
      },
    ],
    type: [CreateQuestionDto],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions?: CreateQuestionDto[];
}
