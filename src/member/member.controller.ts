import { Body, Controller, Post } from '@nestjs/common';
import { MemberService } from './member.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMemberDto } from './dtos/create-member.dto';

@ApiTags('members')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Create a new member' }) // API 설명 추가
  @ApiResponse({
    status: 201,
    description: 'The member has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() body: CreateMemberDto) {
    return this.memberService.create(body);
  }
}
