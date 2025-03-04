import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { Question } from './entities/question.entity';
import { Option } from './entities/option.entity';
import { Answer } from './entities/answer.entity';
import { SurveyService } from './services/survey.service';
import { SurveyController } from './controller/survey.controller';
import { AnswerService } from './services/answer.service';
import { AnswerController } from './controller/answer.controller';
import { MemberModule } from 'src/member/member.module';
import { Member } from 'src/member/entity/member.entity';
import { WebhookModule } from 'src/webhook/webhook.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey, Question, Option, Answer, Member]),
    MemberModule,
    WebhookModule,
  ],
  providers: [SurveyService, AnswerService],
  controllers: [SurveyController, AnswerController],
})
export class SurveyModule {}
