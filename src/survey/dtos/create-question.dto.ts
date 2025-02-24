import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateOptionDto } from './create-option.dto';
import { Type } from 'class-transformer';
import { QuestionType } from '../enums/question-type.enum';

export class CreateQuestionDto {
  @IsString()
  questionText: string;

  @IsEnum(QuestionType)
  questionType: QuestionType;

  // 객관식 질문일 경우 옵션 배열 전달
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  options?: CreateOptionDto[];
}
