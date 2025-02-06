import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entity/member.entitiy';
import { CreateMemberDto } from './dtos/create-member.dto';

@Injectable()
export class MemberService {
  constructor(@InjectRepository(Member) private repo: Repository<Member>) {}

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const member = this.repo.create(createMemberDto);
    return await this.repo.save(member);
  }
}
