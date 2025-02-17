import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entity/member.entitiy';
import { CreateMemberDto } from './dtos/create-member.dto';
import { WebhookService } from 'src/webhook/webhook.service';
import { buildWebhookData } from 'src/webhook/webhook.utils';

@Injectable()
export class MemberService {
  private readonly logger = new Logger(MemberService.name);

  constructor(
    @InjectRepository(Member) private repo: Repository<Member>,
    private readonly webhookService: WebhookService,
  ) {}

  // 회원 생성
  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const member = this.repo.create(createMemberDto);
    const savedMember = await this.repo.save(member);

    // Webhook 데이터 구성
    const webhookData = buildWebhookData(savedMember);
    // Webhook 전송
    await this.webhookService.sendToMakeWebhook(webhookData);

    return savedMember;
  }

  // 모든 회원 조회
  async getAllMembers(): Promise<Member[]> {
    return await this.repo.find();
  }

  // 특정 아이디로 회원찾기
  async findUserById(mbr_id: number): Promise<Member> {
    const member = await this.repo.findOneBy({ mbr_id });
    if (!member)
      // throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
      throw new NotFoundException('Member not found');
    return member;
  }
}
