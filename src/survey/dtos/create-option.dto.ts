import { IsString } from 'class-validator';

export class CreateOptionDto {
  @IsString()
  optionText: string;
}
