import { Body, Controller, Post } from '@nestjs/common';
import { MemberService } from './member.service';
import { Member } from './entity/member.entitiy';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  async create(@Body() memberData: Partial<Member>) {
    return this.memberService.create(memberData);
  }
}
