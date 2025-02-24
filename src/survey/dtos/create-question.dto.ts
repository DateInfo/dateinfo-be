import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateOptionDto } from './create-option.dto';
import { Type } from 'class-transformer';
import { QuestionType } from '../enums/question-type.enum';

export class CreateQuestionDto {
  @ApiProperty({
    description: '질문의 내용',
    example: '당신의 성별은?',
  })
  @IsString()
  questionText: string;

  @ApiProperty({
    description: '질문의 유형',
    enum: QuestionType,
    example: QuestionType.MULTIPLE_CHOICE, // 객관식 질문인 경우
  })
  @IsEnum(QuestionType)
  questionType: QuestionType;

  @ApiPropertyOptional({
    description: '객관식 질문일 경우 제공할 옵션 목록',
    example: [{ optionText: '남자' }, { optionText: '여자' }],
    type: [CreateOptionDto],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateOptionDto)
  options?: CreateOptionDto[];
}
