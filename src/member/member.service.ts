import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entity/member.entitiy';
import { CreateMemberDto } from './dtos/create-member.dto';
import { WebhookService } from 'src/webhook/webhook.service';

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
    const webhookData = {
      mbr_id: savedMember.mbr_id,
      mbr_email: savedMember.mbr_email,
      mbr_name: savedMember.mbr_name,
      mbr_lastlogin_date: new Date().toISOString(),
    };

    // Webhook 전송 (비동기 실행, 회원가입 프로세스에 영향 X)
    try {
      await this.webhookService.sendToMakeWebhook(webhookData);
      this.logger.log(
        `Make.com Webhook 전송 성공: ${JSON.stringify(webhookData)}`,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Make.com Webhook 요청 실패: ${error.message}`);
      } else {
        this.logger.error('Make.com Webhook 요청 실패: 알 수 없는 오류 발생');
      }
    }

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
