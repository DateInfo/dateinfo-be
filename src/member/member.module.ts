import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { Member } from './entity/member.entitiy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookModule } from 'src/webhook/webhook.module';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), WebhookModule],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
