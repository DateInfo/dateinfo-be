import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { Question } from './entities/question.entity';
import { Option } from './entities/option.entity';
import { Answer } from './entities/answer.entity';
import { SurveyService } from './services/survey.service';
import { SurveyController } from './controller/survey.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Survey, Question, Option, Answer])],
  providers: [SurveyService],
  controllers: [SurveyController],
})
export class SurveyModule {}
