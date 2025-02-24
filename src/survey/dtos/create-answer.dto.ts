import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAnswerDto {
  @ApiProperty({
    description: '응답이 연결된 설문조사의 ID',
    example: 1,
  })
  @IsNumber()
  surveyId: number;

  @ApiProperty({
    description: '응답이 연결된 질문의 ID',
    example: 2,
  })
  @IsNumber()
  questionId: number;

  @ApiPropertyOptional({
    description: '객관식 응답일 경우 선택된 옵션의 ID',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  selectedOptionId?: number;

  @ApiPropertyOptional({
    description: '주관식 응답 텍스트',
    example: 'INTJ',
  })
  @IsOptional()
  @IsString()
  answerText?: string;
}
