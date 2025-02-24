import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsNumber()
  surveyId: number;

  @IsNumber()
  questionId: number;

  @IsOptional()
  @IsNumber()
  // 객관식 응답의 경우 선택된 옵션의 id
  selectedOptionId?: number;

  @IsOptional()
  @IsString()
  // 주관식 응답 텍스트
  answerText?: string;
}
