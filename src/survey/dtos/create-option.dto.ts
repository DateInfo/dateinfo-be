import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOptionDto {
  @ApiProperty({
    description: '옵션의 텍스트',
    example: '남자', // 질문에 따라 남자, 여자 등 예시값 지정
  })
  @IsString()
  optionText: string;
}
