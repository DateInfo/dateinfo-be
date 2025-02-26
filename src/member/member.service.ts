import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entity/member.entitiy';
import { CreateMemberDto } from './dtos/create-member.dto';
import { WebhookService } from 'src/webhook/webhook.service';
import { buildWebhookData } from 'src/webhook/webhook.utils';
import { Member } from './entity/member.entitiy';
import { MemberRepository } from './member.repository';

@Injectable()
export class MemberService {
  constructor(@InjectRepository(Member) private repo: Repository<Member>) {}

  // 회원 생성
  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const member = this.repo.create(createMemberDto);
    return await this.repo.save(member);
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
