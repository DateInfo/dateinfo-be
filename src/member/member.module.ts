import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { Member } from './entity/member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookModule } from 'src/webhook/webhook.module';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), WebhookModule],
  controllers: [MemberController],
  providers: [MemberService],
  exports: [TypeOrmModule],
})
export class MemberModule {}
