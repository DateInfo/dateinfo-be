import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { CreateQuestionDto } from './create-question.dto';
import { Type } from 'class-transformer';

export class CreateSurveyDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  // 설문 생성 시 질문도 함께 입력할 수 있도록 옵션 처리
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions?: CreateQuestionDto[];
}
