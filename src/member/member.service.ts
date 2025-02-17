import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { CreateMemberDto } from './dtos/create-member.dto';
import { WebhookService } from 'src/webhook/webhook.service';
import { buildWebhookData } from 'src/webhook/webhook.utils';
import { Member } from './entity/member.entitiy';
import { MemberRepository } from './member.repository';

@Injectable()
export class MemberService {
  private readonly logger = new Logger(MemberService.name);

  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly webhookService: WebhookService,
  ) {}

  // 회원 생성
  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const member = this.memberRepository.create(createMemberDto);
    const savedMember = await this.memberRepository.save(member);

    // Webhook 데이터 구성
    const webhookData = buildWebhookData(savedMember);
    // Webhook 전송
    await this.webhookService.sendToMakeWebhook(webhookData);

    return savedMember;
  }

  // 모든 회원 조회
  async getAllMembers(): Promise<Member[]> {
    return this.memberRepository.findAll();
  }

  // 특정 아이디로 회원찾기
  async findUserById(mbr_id: number): Promise<Member> {
    const member = await this.memberRepository.findById(mbr_id);
    if (!member) throw new NotFoundException('Member not found');

    const webhookData = buildWebhookData(member);
    // Webhook 전송
    await this.webhookService.sendToMakeWebhook(webhookData);
    return member;
  }
}
