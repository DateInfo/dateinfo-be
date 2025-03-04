import { IsNotEmpty, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class AnswerDto {
  @ApiProperty({ description: '질문 ID', example: 32 })
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @ApiProperty({
    description: '선택한 옵션 ID (multiple-choice)',
    example: 64,
    required: false,
  })
  @IsNumber()
  @IsNotEmpty()
  selectedOptionId?: number;

  @ApiProperty({
    description: '단답형 텍스트 답변 (short-answer)',
    example: '저는 내향적입니다.',
    required: false,
  })
  @IsNotEmpty()
  answerText?: string;
}

export class CreateSurveyAnswerDto {
  @ApiProperty({ description: '멤버 ID', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  memberId: number;

  @ApiProperty({ description: '설문 ID', example: 5 })
  @IsNumber()
  @IsNotEmpty()
  surveyId: number;

  @ApiProperty({
    description: '모든 질문에 대한 답변 배열',
    type: [AnswerDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
