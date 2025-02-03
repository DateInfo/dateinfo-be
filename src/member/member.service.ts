import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entity/member.entitiy';
import { Repository } from 'typeorm';

@Injectable()
export class MemberService {
  constructor(@InjectRepository(Member) private reop: Repository<Member>) {}

  async create(memberData: Partial<Member>): Promise<Member> {
    const member = this.reop.create(memberData);
    return await this.reop.save(member);
  }
}
